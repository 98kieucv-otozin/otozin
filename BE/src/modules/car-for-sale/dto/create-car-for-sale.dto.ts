import {
    IsString,
    IsNumber,
    IsOptional,
    IsEnum,
    IsArray,
    IsUUID,
    IsEmail,
    IsBoolean,
    IsNotEmpty,
    Min,
    Max,
    Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CarCondition {
    NEW = 'new',
    LIKE_NEW = 'like_new',
    USED = 'used',
    ZIN = 'zin',
}

export enum CarSaleStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    SOLD = 'sold',
    PENDING = 'pending',
    EXPIRED = 'expired',
    DELETED = 'deleted',
}

export class CreateCarForSaleDto {
    @IsUUID('4', { message: 'model_year_id must be a valid UUID' })
    @IsNotEmpty({ message: 'model_year_id is required' })
    model_year_id: string;

    @IsUUID('4', { message: 'trim_id must be a valid UUID' })
    @IsOptional()
    trim_id?: string;

    @IsString({ message: 'Fuel type must be a string' })
    @IsNotEmpty({ message: 'Fuel type is required' })
    fuel: string; // gasoline, diesel, electric, hybrid

    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    @Length(10, 255, { message: 'Title must be between 10 and 255 characters' })
    title: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description?: string;

    @IsNumber({}, { message: 'Price must be a number' })
    @Min(0, { message: 'Price cannot be negative' })
    @IsNotEmpty({ message: 'Price is required' })
    price: number;

    @IsEnum(CarCondition, { message: 'Invalid car condition' })
    @IsOptional()
    condition?: CarCondition = CarCondition.NEW;

    @IsEnum(CarSaleStatus, { message: 'Invalid car sale status' })
    @IsOptional()
    status?: CarSaleStatus = CarSaleStatus.ACTIVE;

    @IsNumber({}, { message: 'Odometer reading must be a number' })
    @Min(0, { message: 'Odometer reading cannot be negative' })
    @IsOptional()
    odo?: number; // số km đã đi

    @IsNumber({}, { message: 'Year must be a number' })
    @Min(1900, { message: 'Year cannot be earlier than 1900' })
    @Max(new Date().getFullYear() + 1, { message: 'Year cannot be in the future' })
    @IsOptional()
    year?: number; // năm sản xuất

    @IsString({ message: 'Color must be a string' })
    @IsOptional()
    color?: string;

    @IsString({ message: 'VIN must be a string' })
    @Length(17, 17, { message: 'VIN must be exactly 17 characters long' })
    @IsOptional()
    vin?: string; // số khung

    @IsString({ message: 'License plate must be a string' })
    @IsOptional()
    license_plate?: string;

    @IsString({ message: 'Province must be a string' })
    @IsOptional()
    province?: string; // tỉnh/thành phố

    @IsArray({ message: 'Images must be an array' })
    @IsString({ each: true, message: 'Each image must be a string URL' })
    @IsOptional()
    images?: string[]; // URLs từ R2 upload

    @IsString({ message: 'Thumbnail must be a string URL' })
    thumbnail?: string; // URL của ảnh thumbnail

    @IsOptional()
    features?: Record<string, any>; // tính năng bổ sung (JSONB)

    @IsString({ message: 'Contact phone must be a string' })
    @IsOptional()
    contact_phone?: string;

    @IsEmail({}, { message: 'Contact email must be a valid email address' })
    @IsOptional()
    contact_email?: string;

    @IsOptional()
    @IsBoolean({ message: 'is_featured must be a boolean value' })
    is_featured?: boolean = false;
}

