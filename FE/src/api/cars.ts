/**
 * Cars API Module
 */
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api-client';
import type { Car, CarFilters, PaginatedResponse } from '@/types/api';

const CARS_ENDPOINT = '/cars';

/**
 * Get all cars with filters and pagination
 */
export async function getCars(filters?: CarFilters): Promise<PaginatedResponse<Car>> {
    const params = new URLSearchParams();

    if (filters) {
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.order) params.append('order', filters.order);
        if (filters.brandId) params.append('brandId', filters.brandId.toString());
        if (filters.provinceId) params.append('provinceId', filters.provinceId.toString());
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.year) params.append('year', filters.year.toString());
        if (filters.fuelType) params.append('fuelType', filters.fuelType);
        if (filters.transmission) params.append('transmission', filters.transmission);
        if (filters.bodyType) params.append('bodyType', filters.bodyType);
        if (filters.status) params.append('status', filters.status);
        if (filters.query) params.append('query', filters.query);
    }

    const queryString = params.toString();
    const url = queryString ? `${CARS_ENDPOINT}?${queryString}` : CARS_ENDPOINT;

    return apiGet<PaginatedResponse<Car>>(url);
}

/**
 * Get a single car by ID
 */
export async function getCarById(id: number): Promise<Car> {
    return apiGet<Car>(`${CARS_ENDPOINT}/${id}`);
}

/**
 * Create a new car
 */
export async function createCar(data: Partial<Car>): Promise<Car> {
    return apiPost<Car>(CARS_ENDPOINT, data);
}

/**
 * Update a car
 */
export async function updateCar(id: number, data: Partial<Car>): Promise<Car> {
    return apiPut<Car>(`${CARS_ENDPOINT}/${id}`, data);
}

/**
 * Delete a car
 */
export async function deleteCar(id: number): Promise<void> {
    return apiDelete<void>(`${CARS_ENDPOINT}/${id}`);
}

/**
 * Get featured cars
 */
export async function getFeaturedCars(limit = 10): Promise<Car[]> {
    return apiGet<Car[]>(`${CARS_ENDPOINT}/featured?limit=${limit}`);
}

/**
 * Get new cars
 */
export async function getNewCars(limit = 10): Promise<Car[]> {
    return apiGet<Car[]>(`${CARS_ENDPOINT}/new?limit=${limit}`);
}

/**
 * Get like-new cars
 */
export async function getLikeNewCars(limit = 10): Promise<Car[]> {
    return apiGet<Car[]>(`${CARS_ENDPOINT}/like-new?limit=${limit}`);
}

/**
 * Get best selling EVs
 */
export async function getBestSellingEVs(limit = 10): Promise<Car[]> {
    return apiGet<Car[]>(`${CARS_ENDPOINT}/best-selling-evs?limit=${limit}`);
}

/**
 * Get cars for sale with filters and pagination
 */
export async function getCarsForSale(filters?: CarFilters): Promise<PaginatedResponse<Car>> {
    const params = new URLSearchParams();

    if (filters) {
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.order) params.append('order', filters.order);
        if (filters.brandId) params.append('brandId', filters.brandId.toString());
        if (filters.provinceId) params.append('provinceId', filters.provinceId.toString());
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.year) params.append('year', filters.year.toString());
        if (filters.fuelType) params.append('fuelType', filters.fuelType);
        if (filters.transmission) params.append('transmission', filters.transmission);
        if (filters.bodyType) params.append('bodyType', filters.bodyType);
        if (filters.status) params.append('status', filters.status);
        if (filters.query) params.append('query', filters.query);
    }

    const queryString = params.toString();
    const url = queryString
        ? `${CARS_ENDPOINT}/for-sale?${queryString}`
        : `${CARS_ENDPOINT}/for-sale`;

    return apiGet<PaginatedResponse<Car>>(url);
}

