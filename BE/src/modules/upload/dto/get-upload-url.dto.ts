import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUploadUrlDto {
    @IsInt({ message: 'Count must be an integer' })
    @Type(() => Number)
    @Min(1, { message: 'Count must be at least 1' })
    @Max(100, { message: 'Count must be at most 100' })
    count: number;

    @IsString({ message: 'Subfolder must be a string' })
    @IsOptional()
    subfolder?: string;
}


