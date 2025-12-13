import { Inject, Injectable, Logger } from '@nestjs/common';
import { sql as drizzleSql } from 'drizzle-orm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { DRIZZLE_DB } from '../../database/drizzle/drizzle.module';
import { brands, models, modelYears, trims } from '../../database/drizzle/schema';
import { brands as masterBrands } from '../../../database/json_master/brands';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

interface JsonTrim {
  id: string;
  name: string;
  full_name?: string;
  engine?: string;
  drive?: string;
  power_hp?: number;
  transmission?: string;
  body_type?: string;
  seats?: number;
  length_mm?: number;
  width_mm?: number;
  height_mm?: number;
  wheelbase_mm?: number;
  weight_kg?: number;
  [key: string]: unknown;
}

interface JsonModelYear {
  id: string;
  year: number;
  trims?: JsonTrim[];
  title?: string;
  fuel?: string;
  engine?: string;
  motor?: string;
  transmission?: string;
  drive?: string;
  power_hp?: number;
  body_type?: string;
  seats?: number;
  fuel_consumption_l_100km?: number;
  battery_capacity_kWh?: number;
  range_km?: number;
  wh_per_km?: number;
  torque_Nm?: number;
  top_speed_kmh?: number;
  acceleration_0_100?: number;
  length_mm?: number;
  width_mm?: number;
  height_mm?: number;
  wheelbase_mm?: number;
  weight_kg?: number;
  ground_clearance_mm?: number;
  rim_type?: string;
  tire_size?: string;
  trunk_volume_l?: number;
  airbags?: number;
  [key: string]: unknown;
}

interface JsonModel {
  id: string;
  model: string;
  fuel?: string;
  body_type?: string;
  slug?: string;
  years?: number[];
  model_years?: JsonModelYear[];
  [key: string]: unknown;
}

interface JsonRoot {
  brand_id: number;
  models: JsonModel[];
}

@Injectable()
export class SyncDbService {
  private readonly logger = new Logger(SyncDbService.name);

  constructor(@Inject(DRIZZLE_DB) private readonly db: NodePgDatabase) { }

  /**
   * Reset (truncate) các bảng models, model_years, trims
   */
  async resetModelsTables(): Promise<void> {
    try {
      await this.db.execute(drizzleSql`TRUNCATE TABLE models, model_years, trims RESTART IDENTITY`);
      this.logger.log('Tables models, model_years, trims truncated successfully.');
    } catch (error) {
      this.logger.error('Failed to truncate models tables.', error as Error);
      throw error;
    }
  }

  /**
   * Map brands từ file TypeScript `database/json_master/brands.ts` vào bảng `brands`.
   */
  async mapBrandsToDatabase(): Promise<void> {
    this.logger.log('Syncing master brands from brands.ts into DB...');

    await this.db.transaction(async (tx) => {
      for (const brand of masterBrands) {
        await tx
          .insert(brands)
          .values({
            id: brand.id,
            name: brand.name,
            link: brand.link,
            description: brand.description,
            image: brand.image,
            isActive: brand.is_active,
          })
          .onConflictDoUpdate({
            target: brands.id,
            set: {
              name: brand.name,
              link: brand.link,
              description: brand.description,
              image: brand.image,
              isActive: brand.is_active,
            },
          });
      }
    });

    this.logger.log('Master brands synced into DB from brands.ts.');
  }

  /**
   * Sync tất cả các file JSON models vào các bảng: models, model_years, trims.
   */
  async syncAllJsonModelsToDb(): Promise<void> {
    const baseDir = path.join(process.cwd(), 'database', 'json_master', 'models');
    this.logger.log(`Syncing all model JSON files in ${baseDir} into DB...`);

    const files = await fs.readdir(baseDir);
    const jsonFiles = files.filter((file) => file.toLowerCase().endsWith('.json'));

    if (jsonFiles.length === 0) {
      this.logger.warn('No JSON files found in database/json_master/models.');
      return;
    }

    for (const fileName of jsonFiles) {
      await this.syncSingleModelJsonToDb(path.join(baseDir, fileName));
    }

    this.logger.log('All model JSON files synced into DB.');
  }

  /**
   * Sync một file JSON models cụ thể vào DB.
   */
  async syncSingleModelJsonToDb(filePath: string): Promise<void> {
    const baseName = path.basename(filePath);
    this.logger.log(`Syncing model JSON "${baseName}" into DB...`);

    const raw = await fs.readFile(filePath, 'utf8');
    const root = JSON.parse(raw) as JsonRoot;

    if (!root || !Array.isArray(root.models)) {
      this.logger.error(`${baseName} không đúng format: thiếu field "models" dạng array`);
      return;
    }

    const brandId = root.brand_id;

    await this.db.transaction(async (tx) => {
      for (const model of root.models) {
        const modelId = model.id;
        const modelName = model.model;
        const modelSlug = model.slug ?? this.slugify(modelName);
        const bodyType = model.body_type ?? null;

        // 1) Upsert model
        await tx
          .insert(models)
          .values({
            id: modelId,
            brandId,
            name: modelName,
            slug: modelSlug,
            bodyType,
          })
          .onConflictDoUpdate({
            target: models.id,
            set: {
              brandId,
              name: modelName,
              slug: modelSlug,
              bodyType,
            },
          });

        const modelYearsList = model.model_years ?? [];
        for (const my of modelYearsList) {
          const modelYearId = my.id;
          const year = my.year;
          const myAny: any = my as any;

          // 2) Upsert model_year
          await tx
            .insert(modelYears)
            .values({
              id: modelYearId,
              modelId,
              year,
              title: myAny.title ?? `VinFast ${modelName} ${year}`,
              fuel: myAny.fuel ?? null,
              engine: myAny.engine ?? null,
              motor: myAny.motor ?? null,
              transmission: myAny.transmission ?? null,
              drive: myAny.drive ?? null,
              powerHp: myAny.power_hp ?? null,
              bodyType: myAny.body_type ?? bodyType,
              seats: myAny.seats ?? null,
              fuelConsumptionL100km: myAny.fuel_consumption_l_100km?.toString() ?? null,
              rangeKm: myAny.range_km ?? null,
              whPerKm: myAny.wh_per_km ?? null,
              topSpeedKmh: myAny.top_speed_kmh ?? null,
              acceleration0100: myAny.acceleration_0_100?.toString() ?? null,
              lengthMm: myAny.length_mm ?? null,
              widthMm: myAny.width_mm ?? null,
              heightMm: myAny.height_mm ?? null,
              wheelbaseMm: myAny.wheelbase_mm ?? null,
              weightKg: myAny.weight_kg ?? null,
              groundClearanceMm: myAny.ground_clearance_mm ?? null,
              rimType: myAny.rim_type ?? null,
              tireSize: myAny.tire_size ?? null,
              trunkVolumeL: myAny.trunk_volume_l ?? null,
              airbags: myAny.airbags ?? null,
            })
            .onConflictDoUpdate({
              target: modelYears.id,
              set: {
                modelId,
                year,
                title: myAny.title ?? `VinFast ${modelName} ${year}`,
                fuel: myAny.fuel ?? null,
                engine: myAny.engine ?? null,
                motor: myAny.motor ?? null,
                transmission: myAny.transmission ?? null,
                drive: myAny.drive ?? null,
                powerHp: myAny.power_hp ?? null,
                bodyType: myAny.body_type ?? bodyType,
                seats: myAny.seats ?? null,
                fuelConsumptionL100km: myAny.fuel_consumption_l_100km?.toString() ?? null,
                rangeKm: myAny.range_km ?? null,
                whPerKm: myAny.wh_per_km ?? null,
                topSpeedKmh: myAny.top_speed_kmh ?? null,
                acceleration0100: myAny.acceleration_0_100?.toString() ?? null,
                lengthMm: myAny.length_mm ?? null,
                widthMm: myAny.width_mm ?? null,
                heightMm: myAny.height_mm ?? null,
                wheelbaseMm: myAny.wheelbase_mm ?? null,
                weightKg: myAny.weight_kg ?? null,
                groundClearanceMm: myAny.ground_clearance_mm ?? null,
                rimType: myAny.rim_type ?? null,
                tireSize: myAny.tire_size ?? null,
                trunkVolumeL: myAny.trunk_volume_l ?? null,
                airbags: myAny.airbags ?? null,
              },
            });

          const trimsList = my.trims ?? [];

          if (trimsList.length > 0) {
            // 3) Có trims: mỗi trim là một bản ghi
            for (const trim of trimsList) {
              const fuelValue: any = (model as any).fuel ?? null;
              const bodyTypeValue: any = (trim as any).body_type ?? bodyType ?? null;

              await tx
                .insert(trims)
                .values({
                  id: trim.id,
                  modelYearId,
                  trimName: trim.name,
                  fullName: trim.full_name ?? null,
                  title: (trim as any).title ?? null,
                  fuel: fuelValue ?? 'gasoline',
                  engine: trim.engine ?? null,
                  motor: (trim as any).motor ?? null,
                  transmission: trim.transmission ?? null,
                  drive: trim.drive ?? 'FWD',
                  powerHp: trim.power_hp ?? null,
                  bodyType: bodyTypeValue,
                  seats: trim.seats ?? null,
                  fuelConsumptionL100km: (trim as any).fuel_consumption_l_100km?.toString() ?? null,
                  rangeKm: (trim as any).range_km ?? null,
                  whPerKm: (trim as any).wh_per_km ?? null,
                  topSpeedKmh: (trim as any).top_speed_kmh ?? null,
                  acceleration0100: (trim as any).acceleration_0_100?.toString() ?? null,
                  lengthMm: trim.length_mm ?? null,
                  widthMm: trim.width_mm ?? null,
                  heightMm: trim.height_mm ?? null,
                  wheelbaseMm: trim.wheelbase_mm ?? null,
                  weightKg: trim.weight_kg ?? null,
                  groundClearanceMm: (trim as any).ground_clearance_mm ?? null,
                  rimType: (trim as any).rim_type ?? null,
                  tireSize: (trim as any).tire_size ?? null,
                  trunkVolumeL: (trim as any).trunk_volume_l ?? null,
                  airbags: (trim as any).airbags ?? null,
                })
                .onConflictDoUpdate({
                  target: trims.id,
                  set: {
                    trimName: trim.name,
                    fullName: trim.full_name ?? null,
                    title: (trim as any).title ?? null,
                    fuel: fuelValue ?? 'gasoline',
                    engine: trim.engine ?? null,
                    motor: (trim as any).motor ?? null,
                    transmission: trim.transmission ?? null,
                    drive: trim.drive ?? 'FWD',
                    powerHp: trim.power_hp ?? null,
                    bodyType: bodyTypeValue,
                    seats: trim.seats ?? null,
                    fuelConsumptionL100km: (trim as any).fuel_consumption_l_100km?.toString() ?? null,
                    rangeKm: (trim as any).range_km ?? null,
                    whPerKm: (trim as any).wh_per_km ?? null,
                    topSpeedKmh: (trim as any).top_speed_kmh ?? null,
                    acceleration0100: (trim as any).acceleration_0_100?.toString() ?? null,
                    lengthMm: trim.length_mm ?? null,
                    widthMm: trim.width_mm ?? null,
                    heightMm: trim.height_mm ?? null,
                    wheelbaseMm: trim.wheelbase_mm ?? null,
                    weightKg: trim.weight_kg ?? null,
                    groundClearanceMm: (trim as any).ground_clearance_mm ?? null,
                    rimType: (trim as any).rim_type ?? null,
                    tireSize: (trim as any).tire_size ?? null,
                    trunkVolumeL: (trim as any).trunk_volume_l ?? null,
                    airbags: (trim as any).airbags ?? null,
                  },
                });
            }
          } else {
            // 3b) Không có trims: dùng chính model_year làm một trim "mặc định"
            await tx
              .insert(trims)
              .values({
                id: my.id,
                modelYearId,
                trimName: model.model,
                fullName: (my as any).full_name ?? null,
                title: (my as any).title ?? null,
                fuel: model.fuel ?? 'gasoline',
                engine: (my as any).engine ?? null,
                motor: (my as any).motor ?? null,
                transmission: (my as any).transmission ?? null,
                drive: (my as any).drive ?? 'FWD',
                powerHp: (my as any).power_hp ?? null,
                bodyType: (my as any).body_type ?? bodyType ?? null,
                seats: (my as any).seats ?? null,
                fuelConsumptionL100km: (my as any).fuel_consumption_l_100km?.toString() ?? null,
                rangeKm: (my as any).range_km ?? null,
                whPerKm: (my as any).wh_per_km ?? null,
                topSpeedKmh: (my as any).top_speed_kmh ?? null,
                acceleration0100: (my as any).acceleration_0_100?.toString() ?? null,
                lengthMm: (my as any).length_mm ?? null,
                widthMm: (my as any).width_mm ?? null,
                heightMm: (my as any).height_mm ?? null,
                wheelbaseMm: (my as any).wheelbase_mm ?? null,
                weightKg: (my as any).weight_kg ?? null,
                groundClearanceMm: (my as any).ground_clearance_mm ?? null,
                rimType: (my as any).rim_type ?? null,
                tireSize: (my as any).tire_size ?? null,
                trunkVolumeL: (my as any).trunk_volume_l ?? null,
                airbags: (my as any).airbags ?? null,
              })
              .onConflictDoUpdate({
                target: trims.id,
                set: {
                  trimName: model.model,
                  fullName: (my as any).full_name ?? null,
                  title: (my as any).title ?? null,
                  fuel: model.fuel ?? 'gasoline',
                  engine: (my as any).engine ?? null,
                  motor: (my as any).motor ?? null,
                  transmission: (my as any).transmission ?? null,
                  drive: (my as any).drive ?? 'FWD',
                  powerHp: (my as any).power_hp ?? null,
                  bodyType: (my as any).body_type ?? bodyType ?? null,
                  seats: (my as any).seats ?? null,
                  fuelConsumptionL100km: (my as any).fuel_consumption_l_100km?.toString() ?? null,
                  rangeKm: (my as any).range_km ?? null,
                  whPerKm: (my as any).wh_per_km ?? null,
                  topSpeedKmh: (my as any).top_speed_kmh ?? null,
                  acceleration0100: (my as any).acceleration_0_100?.toString() ?? null,
                  lengthMm: (my as any).length_mm ?? null,
                  widthMm: (my as any).width_mm ?? null,
                  heightMm: (my as any).height_mm ?? null,
                  wheelbaseMm: (my as any).wheelbase_mm ?? null,
                  weightKg: (my as any).weight_kg ?? null,
                  groundClearanceMm: (my as any).ground_clearance_mm ?? null,
                  rimType: (my as any).rim_type ?? null,
                  tireSize: (my as any).tire_size ?? null,
                  trunkVolumeL: (my as any).trunk_volume_l ?? null,
                  airbags: (my as any).airbags ?? null,
                },
              });
          }
        }
      }
    });

    this.logger.log(`Model JSON "${baseName}" sync to DB completed.`);
  }

  /**
   * Reset và sync toàn bộ dữ liệu từ json_master vào DB
   */
  async resetAndSyncAllData(): Promise<void> {
    this.logger.log('Starting full reset and sync of all data from json_master...');

    try {
      // 1. Reset bảng brands
      await this.db.execute(drizzleSql`TRUNCATE TABLE brands RESTART IDENTITY`);
      this.logger.log('Brands table truncated.');

      // 2. Reset các bảng models, model_years, trims
      await this.resetModelsTables();

      // 3. Sync brands từ brands.ts
      await this.mapBrandsToDatabase();

      // 4. Sync models từ JSON files
      await this.syncAllJsonModelsToDb();

      this.logger.log('Full reset and sync completed successfully.');
    } catch (error) {
      this.logger.error('Failed to reset and sync all data.', error as Error);
      throw error;
    }
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}
