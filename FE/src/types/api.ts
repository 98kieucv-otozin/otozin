/**
 * API Types - Common types for API requests and responses
 */

import { CarCondition } from "@/constants/constant";

export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

// Car related types
export interface Car {
    id: number;
    brandId: number;
    brandName: string;
    model: string;
    year: number;
    price: number;
    mileage?: number;
    fuelType: string;
    transmission: string;
    bodyType: string;
    color?: string;
    description?: string;
    images: string[];
    provinceId: number;
    provinceName: string;
    status: CarCondition;
    createdAt: string;
    updatedAt: string;
}

export interface CarFilters extends PaginationParams {
    brandId?: number;
    modelYearId?: string;
    modelYearName?: string;
    trimId?: string;
    provinceId?: number;
    minPrice?: number;
    maxPrice?: number;
    year?: number;
    fuelType?: string;
    transmission?: string;
    bodyType?: string;
    status?: CarCondition;
    query?: string;
}

// Brand related types
export interface Brand {
    id: number;
    name: string;
    image?: string;
    link?: string;
}

// Province related types
export interface Province {
    id: number;
    code: string;
    name: string;
    region: string;
}

// Auth related types
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        username: string;
        email: string;
        role: string;
    };
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Search related types
export interface SearchParams {
    query: string;
    filters?: CarFilters;
}

export interface SearchResponse {
    cars: Car[];
    total: number;
    suggestions?: string[];
}

