import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchDto {
  @IsString()
  @IsOptional()
  query?: string; // Query string

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number = 1; // Page number

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(250)
  @IsOptional()
  per_page?: number = 10; // Results per page

  @IsString()
  @IsOptional()
  filter_by?: string; // Filter query (e.g., "year:2024")

  @IsString()
  @IsOptional()
  sort_by?: string; // Sort field (e.g., "year:desc")
}

