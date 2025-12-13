import { Injectable, Inject } from '@nestjs/common';
import { eq, and, isNull, desc, sql as drizzleSql } from 'drizzle-orm';
import { DRIZZLE_DB } from '../../database/drizzle/drizzle.module';
import { carsForSale, users } from '../../database/drizzle/schema';
import { CreateCarForSaleDto } from './dto';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class CarForSaleRepository {
    constructor(@Inject(DRIZZLE_DB) private readonly db: NodePgDatabase) { }

    async create(sellerId: number, createDto: CreateCarForSaleDto) {
        const [result] = await this.db
            .insert(carsForSale)
            .values({
                sellerId,
                modelYearId: createDto.model_year_id,
                trimId: createDto.trim_id || null, // Optional field
                fuel: createDto.fuel,
                title: createDto.title,
                description: createDto.description,
                price: createDto.price.toString(),
                condition: createDto.condition || 'new',
                status: createDto.status || 'draft',
                odo: createDto.odo,
                year: createDto.year,
                color: createDto.color,
                vin: createDto.vin,
                licensePlate: createDto.license_plate,
                province: createDto.province,
                images: createDto.images as any,
                thumbnail: createDto.thumbnail,
                features: createDto.features as any,
                contactPhone: createDto.contact_phone,
                contactEmail: createDto.contact_email,
                isFeatured: createDto.is_featured || false,
            })
            .returning();

        return result;
    }

    async findAll(filters?: {
        status?: string;
        sellerId?: number;
        limit?: number;
        offset?: number;
    }) {
        const conditions = [isNull(carsForSale.deletedAt)];

        if (filters?.status) {
            conditions.push(eq(carsForSale.status, filters.status as any));
        }

        if (filters?.sellerId) {
            conditions.push(eq(carsForSale.sellerId, filters.sellerId));
        }

        const baseQuery = this.db
            .select({
                id: carsForSale.id,
                sellerId: carsForSale.sellerId,
                modelYearId: carsForSale.modelYearId,
                trimId: carsForSale.trimId,
                fuel: carsForSale.fuel,
                title: carsForSale.title,
                description: carsForSale.description,
                price: carsForSale.price,
                condition: carsForSale.condition,
                status: carsForSale.status,
                odo: carsForSale.odo,
                year: carsForSale.year,
                color: carsForSale.color,
                vin: carsForSale.vin,
                licensePlate: carsForSale.licensePlate,
                province: carsForSale.province,
                images: carsForSale.images,
                thumbnail: carsForSale.thumbnail,
                features: carsForSale.features,
                contactPhone: carsForSale.contactPhone,
                contactEmail: carsForSale.contactEmail,
                isFeatured: carsForSale.isFeatured,
                createdAt: carsForSale.createdAt,
                updatedAt: carsForSale.updatedAt,
                deletedAt: carsForSale.deletedAt,
                sellerEmail: users.email,
                sellerFirstName: users.firstName,
                sellerLastName: users.lastName,
            })
            .from(carsForSale)
            .leftJoin(users, eq(users.id, carsForSale.sellerId))
            .where(and(...conditions))
            .orderBy(desc(carsForSale.createdAt));

        if (filters?.limit !== undefined && filters?.offset !== undefined) {
            return await baseQuery.limit(filters.limit).offset(filters.offset);
        } else if (filters?.limit !== undefined) {
            return await baseQuery.limit(filters.limit);
        } else if (filters?.offset !== undefined) {
            return await baseQuery.offset(filters.offset);
        }

        return await baseQuery;
    }

    async findOne(id: number) {
        const [result] = await this.db
            .select({
                id: carsForSale.id,
                sellerId: carsForSale.sellerId,
                modelYearId: carsForSale.modelYearId,
                trimId: carsForSale.trimId,
                fuel: carsForSale.fuel,
                title: carsForSale.title,
                description: carsForSale.description,
                price: carsForSale.price,
                condition: carsForSale.condition,
                status: carsForSale.status,
                odo: carsForSale.odo,
                year: carsForSale.year,
                color: carsForSale.color,
                vin: carsForSale.vin,
                licensePlate: carsForSale.licensePlate,
                province: carsForSale.province,
                images: carsForSale.images,
                thumbnail: carsForSale.thumbnail,
                features: carsForSale.features,
                contactPhone: carsForSale.contactPhone,
                contactEmail: carsForSale.contactEmail,
                isFeatured: carsForSale.isFeatured,
                createdAt: carsForSale.createdAt,
                updatedAt: carsForSale.updatedAt,
                deletedAt: carsForSale.deletedAt,
                sellerEmail: users.email,
                sellerFirstName: users.firstName,
                sellerLastName: users.lastName,
            })
            .from(carsForSale)
            .leftJoin(users, eq(users.id, carsForSale.sellerId))
            .where(and(eq(carsForSale.id, id), isNull(carsForSale.deletedAt)))
            .limit(1);

        return result || null;
    }

    async update(id: number, sellerId: number, updateDto: Partial<CreateCarForSaleDto>) {
        const updateData: any = {};

        if (updateDto.model_year_id !== undefined) updateData.modelYearId = updateDto.model_year_id;
        if (updateDto.trim_id !== undefined) updateData.trimId = updateDto.trim_id || null; // Cho phép set null
        if (updateDto.fuel !== undefined) updateData.fuel = updateDto.fuel;
        if (updateDto.title !== undefined) updateData.title = updateDto.title;
        if (updateDto.description !== undefined) updateData.description = updateDto.description;
        if (updateDto.price !== undefined) updateData.price = updateDto.price.toString();
        if (updateDto.condition !== undefined) updateData.condition = updateDto.condition;
        if (updateDto.status !== undefined) updateData.status = updateDto.status;
        if (updateDto.odo !== undefined) updateData.odo = updateDto.odo;
        if (updateDto.year !== undefined) updateData.year = updateDto.year;
        if (updateDto.color !== undefined) updateData.color = updateDto.color;
        if (updateDto.vin !== undefined) updateData.vin = updateDto.vin;
        if (updateDto.license_plate !== undefined) updateData.licensePlate = updateDto.license_plate;
        if (updateDto.province !== undefined) updateData.province = updateDto.province;
        if (updateDto.images !== undefined) updateData.images = updateDto.images as any;
        if (updateDto.thumbnail !== undefined) updateData.thumbnail = updateDto.thumbnail;
        if (updateDto.features !== undefined) updateData.features = updateDto.features as any;
        if (updateDto.contact_phone !== undefined) updateData.contactPhone = updateDto.contact_phone;
        if (updateDto.contact_email !== undefined) updateData.contactEmail = updateDto.contact_email;
        if (updateDto.is_featured !== undefined) updateData.isFeatured = updateDto.is_featured;

        if (Object.keys(updateData).length === 0) {
            return this.findOne(id);
        }

        updateData.updatedAt = new Date();

        const [result] = await this.db
            .update(carsForSale)
            .set(updateData)
            .where(and(eq(carsForSale.id, id), eq(carsForSale.sellerId, sellerId), isNull(carsForSale.deletedAt)))
            .returning();

        return result || null;
    }

    async delete(id: number, sellerId: number) {
        const [result] = await this.db
            .update(carsForSale)
            .set({ deletedAt: new Date() })
            .where(and(eq(carsForSale.id, id), eq(carsForSale.sellerId, sellerId), isNull(carsForSale.deletedAt)))
            .returning();

        return result || null;
    }
}
