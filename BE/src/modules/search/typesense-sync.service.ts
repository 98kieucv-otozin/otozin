import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import * as path from 'path';
import Typesense from 'typesense';
import { SyncDbService } from './sync-db.service';

@Injectable()
export class TypesenseSyncService {
  private readonly logger = new Logger(TypesenseSyncService.name);
  // Use any here because we are relying on runtime Typesense client without TS types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly client: any;

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => SyncDbService)) private readonly syncDbService: SyncDbService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.client = new (Typesense as any).Client({
      nodes: [
        {
          host: this.configService.get<string>('TYPESENSE_HOST') || 'localhost',
          port: Number(this.configService.get<string>('TYPESENSE_PORT') || 8108),
          protocol: this.configService.get<string>('TYPESENSE_PROTOCOL') || 'http',
        },
      ],
      apiKey: this.configService.get<string>('TYPESENSE_API_KEY') || 'MY_SECRET_KEY',
      connectionTimeoutSeconds: 10,
    });
  }

  /**
   * Reset (xóa & tạo lại) collection car_models trên Typesense
   * theo schema được thiết kế dựa trên cấu trúc vinfast.json:
   * {
   *   "models": [
   *     {
   *       "id": string,
   *       "model": string,
   *       "fuel": string,
   *       "years": number[],
   *       ...
   *     }
   *   ]
   * }
   */
  private async resetCarModelsCollection(): Promise<void> {
    const collectionName = 'car_models';

    try {
      await this.client.collections(collectionName).delete();
      this.logger.log(`Typesense collection "${collectionName}" deleted before re-creation.`);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      const status = err?.httpStatus ?? err?.status ?? err?.code;
      if (status && Number(status) !== 404) {
        this.logger.error(`Error while deleting Typesense collection "${collectionName}".`, error as Error);
        throw error;
      }
    }

    this.logger.log(`Typesense collection "${collectionName}" not found. Creating...`);

    try {
      await this.client.collections().create({
        name: collectionName,
        primary_key: 'id',
        fields: [
          // Khóa chính Typesense, luôn là string
          { name: 'id', type: 'string' },
          // Các khóa để map ngược về DB (UUID dạng string)
          { name: 'model_id', type: 'string', optional: true },
          { name: 'trim_id', type: 'string', optional: true },
          { name: 'brand_id', type: 'int32', optional: true },
          { name: 'model_year_id', type: 'string', optional: true },
          // Thông tin dùng để filter/hiển thị thêm
          { name: 'year', type: 'int32', optional: true },
          // Trường chính để search
          { name: 'title', type: 'string', facet: true },
          // Tên đầy đủ (nếu có), để hiển thị
        ],
      });

      this.logger.log(`Typesense collection "${collectionName}" created successfully.`);
    } catch (error) {
      this.logger.error(`Failed to create Typesense collection "${collectionName}".`, error as Error);
      throw error;
    }
  }

  /**
   * Sync all JSON files from database/json_master to Typesense.
   * - Mỗi file .json tương ứng với một collection trong Typesense (tên = tên file, bỏ .json).
   * - Dữ liệu trong file nên là một mảng JSON (array of objects).
   * - Tự động sync DB trước khi sync Typesense.
   */
  async syncAllJsonMaster(): Promise<void> {
    const baseDir = path.join(process.cwd(), 'database', 'json_master/models');

    this.logger.log(`Starting Typesense sync from directory: ${baseDir}`);

    // 1. Reset và sync toàn bộ dữ liệu vào DB trước
    await this.syncDbService.resetAndSyncAllData();

    // 2. Reset Typesense collection
    await this.resetCarModelsCollection();

    let files: string[];
    try {
      files = await fs.readdir(baseDir);
    } catch (error) {
      this.logger.error(`Cannot read directory ${baseDir}`, error as Error);
      throw error;
    }

    const jsonFiles = files.filter((file) => file.toLowerCase().endsWith('.json'));

    if (jsonFiles.length === 0) {
      this.logger.warn('No JSON files found in json_master directory.');
      return;
    }

    for (const fileName of jsonFiles) {
      const collectionName = 'car_models';
      const filePath = path.join(baseDir, fileName);

      this.logger.log(`Syncing file ${fileName} into Typesense collection "${collectionName}"...`);

      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(fileContent);

        /**
         * Cấu trúc JSON hiện tại (ví dụ file vinfast.json):
         * {
         *   "models": [ { ... }, { ... } ]
         * }
         *
         * Vì vậy ta ưu tiên lấy mảng ở parsed.models.
         * Nếu sau này có file khác dùng cấu trúc mảng trực tiếp hoặc data/items
         * thì vẫn hỗ trợ fallback như cũ.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedAny = parsed as any;

        const models: unknown[] = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsedAny?.models)
            ? parsedAny.models
            : parsedAny.data || parsedAny.items || [];

        if (!Array.isArray(models) || models.length === 0) {
          this.logger.warn(
            `File ${fileName} does not contain a non-empty JSON array (checked root, models, data, items). Skipping.`,
          );
          continue;
        }

        // Chuyển cấu trúc lồng nhau (model -> model_years -> trims)
        // thành từng document phẳng để index vào car_models
        const documents = this.buildDocumentsFromModels(models as any[], parsedAny.brand_id);

        await this.client
          .collections(collectionName)
          .documents()
          .import(documents, { action: 'upsert' });

        this.logger.log(`Synced ${documents.length} documents to collection "${collectionName}".`);
      } catch (error) {
        this.logger.error(`Failed to sync file ${fileName} to Typesense.`, error as Error);
      }
    }

    this.logger.log('Typesense sync from json_master completed.');
  }

  /**
   * Chuyển mảng models (từ vinfast.json) thành các document phẳng
   * để index vào collection car_models.
   *
   * - Nếu có trims: mỗi trim trong từng model_year là một document.
   * - Nếu không có trims: chính model_year là một document.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildDocumentsFromModels(models: any[], brand_id: number): any[] {
    const documents: any[] = [];

    for (const model of models ?? []) {
      if (!model) continue;
      const baseModel = {
        model_id: model.id ?? null,
        brand_id: brand_id,
      };

      const modelYears = Array.isArray(model.model_years) ? model.model_years : [];

      for (const my of modelYears) {
        if (!my) continue;

        const year: number | null = typeof my.year === 'number' ? my.year : null;
        const trims = Array.isArray(my.trims) ? my.trims : null;

        // Trường hợp có trims: mỗi trim là một document
        if (trims && trims.length > 0) {
          for (const trim of trims) {
            if (!trim) continue;

            const doc = {
              id: trim.id ?? null,

              ...baseModel,
              model_year_id: my.id ?? null,
              trim_id: trim.id ?? null,
              year,

              title: trim.title ?? trim.full_name ?? trim.name ?? null,
            };

            documents.push(doc);
          }

          continue;
        } else {

          const doc = {
            id: my.id ?? null,

            ...baseModel,
            model_year_id: my.id ?? null,
            trim_id: null,
            year,

            title: (my as any).title ?? (my as any).full_name ?? (my as any).name ?? null,
          };

          documents.push(doc);

        }

        // Trường hợp không có trims: dùng chính model_year làm document

      }
    }

    return documents;
  }

  /**
   * Search car models in Typesense
   */
  async searchCarModels(query: string, page: number = 1, perPage: number = 10): Promise<any> {
    const collectionName = 'car_models';

    try {
      const searchParameters: any = {
        q: query || '*',
        query_by: 'title',
        page,
        per_page: perPage,
      };

      const searchResults = await this.client
        .collections(collectionName)
        .documents()
        .search(searchParameters);

      return {
        hits: searchResults.hits.map((hit: any) => hit.document) || [],
        found: searchResults.found || 0,
        page: searchResults.page || page,
        search_time_ms: searchResults.search_time_ms || 0,
      };
    } catch (error) {
      this.logger.error('Failed to search car models in Typesense', error as Error);
      throw error;
    }
  }

  /**
   * Đảm bảo collection cars_for_sale tồn tại trong Typesense
   */
  private async ensureCarsForSaleCollection(): Promise<void> {
    const collectionName = 'cars_for_sale';

    try {
      // Thử lấy collection để kiểm tra xem đã tồn tại chưa
      await this.client.collections(collectionName).retrieve();
      this.logger.debug(`Typesense collection "${collectionName}" already exists.`);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      const status = err?.httpStatus ?? err?.status ?? err?.code;
      if (status && Number(status) === 404) {
        // Collection chưa tồn tại, tạo mới
        this.logger.log(`Typesense collection "${collectionName}" not found. Creating...`);
        try {
          await this.client.collections().create({
            name: collectionName,
            primary_key: 'id',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'seller_id', type: 'int32', facet: true },
              { name: 'model_year_id', type: 'string', optional: true },
              { name: 'trim_id', type: 'string', optional: true },
              { name: 'fuel', type: 'string', facet: true },
              { name: 'title', type: 'string' },
              { name: 'price', type: 'float', facet: true },
              { name: 'condition', type: 'string', facet: true },
              { name: 'status', type: 'string', facet: true },
              { name: 'year', type: 'int32', optional: true, facet: true },
              { name: 'color', type: 'string', optional: true, facet: true },
              { name: 'province', type: 'string', optional: true, facet: true },
              { name: 'thumbnail', type: 'string', optional: true },
              { name: 'transmission', type: 'string', optional: true, facet: true },
              { name: 'body_type', type: 'string', optional: true, facet: true },
              { name: 'drive', type: 'string', optional: true, facet: true },
              { name: 'created_at', type: 'int64' },
            ],
          });
          this.logger.log(`Typesense collection "${collectionName}" created successfully.`);
        } catch (createError) {
          this.logger.error(`Failed to create Typesense collection "${collectionName}".`, createError as Error);
          throw createError;
        }
      } else {
        this.logger.error(`Error while checking Typesense collection "${collectionName}".`, error as Error);
        throw error;
      }
    }
  }

  /**
   * Index một car-for-sale vào Typesense
   */
  async indexCarForSale(carForSale: any): Promise<void> {
    const collectionName = 'cars_for_sale';

    try {
      // Đảm bảo collection tồn tại
      await this.ensureCarsForSaleCollection();

      // Chuyển đổi dữ liệu từ DB format sang Typesense document format
      const document = {
        id: carForSale.id?.toString() || '',
        seller_id: carForSale.sellerId || carForSale.seller_id || 0,
        model_year_id: carForSale.modelYearId || carForSale.model_year_id || null,
        trim_id: carForSale.trimId || carForSale.trim_id || null,
        fuel: carForSale.fuel || '',
        title: carForSale.title || '',
        price: typeof carForSale.price === 'string' ? parseFloat(carForSale.price) : (carForSale.price || 0),
        condition: carForSale.condition || 'new',
        status: carForSale.status || 'draft',
        year: carForSale.year || null,
        color: carForSale.color || null,
        province: carForSale.province || null,
        thumbnail: carForSale.thumbnail || null,
        transmission: carForSale.transmission,
        body_type: carForSale.body_type,
        drive: carForSale.drive,
        created_at: carForSale.createdAt
          ? Math.floor(new Date(carForSale.createdAt).getTime() / 1000)
          : Math.floor(Date.now() / 1000),
      };

      // Upsert document vào Typesense
      await this.client.collections(collectionName).documents().upsert(document);
      this.logger.log(`Indexed car-for-sale ID ${document.id} to Typesense.`);
    } catch (error) {
      this.logger.error(`Failed to index car-for-sale to Typesense.`, error as Error);
      // Không throw error để không làm gián đoạn flow tạo car-for-sale
      // Chỉ log lỗi để có thể debug sau
    }
  }

  /**
   * Xóa một car-for-sale khỏi Typesense
   */
  async deleteCarForSaleFromIndex(carForSaleId: number): Promise<void> {
    const collectionName = 'cars_for_sale';

    try {
      await this.client.collections(collectionName).documents(carForSaleId.toString()).delete();
      this.logger.log(`Deleted car-for-sale ID ${carForSaleId} from Typesense.`);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      const status = err?.httpStatus ?? err?.status ?? err?.code;
      if (status && Number(status) === 404) {
        // Document không tồn tại, không cần xóa
        this.logger.debug(`Car-for-sale ID ${carForSaleId} not found in Typesense.`);
      } else {
        this.logger.error(`Failed to delete car-for-sale from Typesense.`, error as Error);
        // Không throw error để không làm gián đoạn flow
      }
    }
  }

  /**
   * Search cars for sale trong Typesense
   * @param query - Search query (tìm theo title)
   * @param sellerId - Filter theo seller_id (optional)
   * @param status - Filter theo status (optional)
   * @param page - Page number (default: 1)
   * @param perPage - Items per page (default: 10)
   * @param sortBy - Sort field (default: 'created_at')
   * @param sortOrder - Sort order: 'asc' | 'desc' (default: 'desc')
   */
  async searchCarsForSale(
    query: string = '*',
    sellerId?: number,
    status?: string,
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'created_at',
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<any> {
    const collectionName = 'cars_for_sale';

    try {
      const filterBy: string[] = [];

      // Filter theo seller_id nếu có
      if (sellerId !== undefined && sellerId !== null) {
        filterBy.push(`seller_id:${sellerId}`);
      }

      // Filter theo status nếu có
      if (status) {
        filterBy.push(`status:${status}`);
      }

      const searchParameters: any = {
        q: query || '*',
        query_by: 'title',
        page,
        per_page: perPage,
        sort_by: `${sortBy}:${sortOrder}`,
      };

      // Thêm filter_by nếu có
      if (filterBy.length > 0) {
        searchParameters.filter_by = filterBy.join(' && ');
      }

      const searchResults = await this.client
        .collections(collectionName)
        .documents()
        .search(searchParameters);

      return {
        hits: searchResults.hits?.map((hit: any) => hit.document) || [],
        found: searchResults.found || 0,
        page: searchResults.page || page,
        per_page: searchResults.per_page || perPage,
        search_time_ms: searchResults.search_time_ms || 0,
      };
    } catch (error) {
      this.logger.error('Failed to search cars for sale in Typesense', error as Error);
      throw error;
    }
  }
}


