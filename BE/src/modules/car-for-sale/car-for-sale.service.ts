import { Injectable, NotFoundException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { CarForSaleRepository } from './car-for-sale.repository';
import { CreateCarForSaleDto, UpdateCarForSaleDto } from './dto';
import { TypesenseSyncService } from '../search/typesense-sync.service';
import { CarModelService } from '../car-model/car-model.service';
import { CarDetail } from '../car-model/car-model.interface';

@Injectable()
export class CarForSaleService {
    constructor(
        private readonly repository: CarForSaleRepository,
        @Inject(forwardRef(() => TypesenseSyncService))
        private readonly typesenseSyncService: TypesenseSyncService,
        private readonly carModelService: CarModelService,
    ) { }

    async create(sellerId: number, createDto: CreateCarForSaleDto) {
        const result = await this.repository.create(sellerId, createDto);

        // Index vào Typesense sau khi tạo thành công
        try {
            // Lấy thêm thông tin từ car-model module (brand, model, trim details)
            const carDetail = await this.carModelService.getCarDetailByModelYearAndTrim(
                createDto.model_year_id,
                createDto.trim_id || null,
            );
            const dataIndex = {
                ...result,
                transmission: carDetail.transmission,
                body_type: carDetail.body_type,
                drive: carDetail.drive,

            };
            await this.typesenseSyncService.indexCarForSale(dataIndex);
        } catch (error) {
            // Log lỗi nhưng không throw để không làm gián đoạn flow tạo car-for-sale
            // Typesense indexing có thể retry sau
            console.error('Error indexing car-for-sale to Typesense:', error);
        }

        return result;
    }

    async findAll(filters?: {
        status?: string;
        sellerId?: number;
        limit?: number;
        offset?: number;
    }) {
        // Convert offset/limit to page/perPage for Typesense
        const limit = filters?.limit || 10;
        const offset = filters?.offset || 0;
        const page = Math.floor(offset / limit) + 1;
        const perPage = limit;

        return this.typesenseSyncService.searchCarsForSale(
            '*', // Search all
            filters?.sellerId,
            filters?.status,
            page,
            perPage,
        );
    }

    /**
     * Tìm kiếm cars for sale từ Typesense theo sellerId
     */
    async findAllBySellerFromTypesense(
        sellerId: number,
        query?: string,
        status?: string,
        page: number = 1,
        perPage: number = 10,
    ) {
        return this.typesenseSyncService.searchCarsForSale(
            query || '*',
            sellerId,
            status,
            page,
            perPage,
        );
    }

    async findOne(id: number) {
        const car = await this.repository.findOne(id);
        if (!car) {
            throw new NotFoundException(`Car for sale with ID ${id} not found`);
        }
        return car;
    }

    async update(id: number, sellerId: number, updateDto: UpdateCarForSaleDto) {
        // Check if car exists and belongs to seller
        const car = await this.repository.findOne(id);
        if (!car) {
            throw new NotFoundException(`Car for sale with ID ${id} not found`);
        }

        if (car.sellerId !== sellerId) {
            throw new ForbiddenException('You can only update your own listings');
        }

        const result = await this.repository.update(id, sellerId, updateDto);

        // Update trong Typesense sau khi update thành công
        if (result) {
            try {
                await this.typesenseSyncService.indexCarForSale(result);
            } catch (error) {
                // Log lỗi nhưng không throw để không làm gián đoạn flow
            }
        }

        return result;
    }

    async remove(id: number, sellerId: number) {
        // Check if car exists and belongs to seller
        const car = await this.repository.findOne(id);
        if (!car) {
            throw new NotFoundException(`Car for sale with ID ${id} not found`);
        }

        if (car.sellerId !== sellerId) {
            throw new ForbiddenException('You can only delete your own listings');
        }

        const result = await this.repository.delete(id, sellerId);

        // Xóa khỏi Typesense sau khi delete thành công
        if (result) {
            try {
                await this.typesenseSyncService.deleteCarForSaleFromIndex(id);
            } catch (error) {
                // Log lỗi nhưng không throw để không làm gián đoạn flow
            }
        }

        return result;
    }
}

