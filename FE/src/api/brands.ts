/**
 * Brands API Module
 */
import { apiGet } from '@/lib/api-client';
import type { Brand } from '@/types/api';

const BRANDS_ENDPOINT = '/brands';

/**
 * Get all brands
 */
export async function getBrands(): Promise<Brand[]> {
    return apiGet<Brand[]>(BRANDS_ENDPOINT);
}

/**
 * Get a single brand by ID
 */
export async function getBrandById(id: number): Promise<Brand> {
    return apiGet<Brand>(`${BRANDS_ENDPOINT}/${id}`);
}

/**
 * Get popular brands
 */
export async function getPopularBrands(limit?: number): Promise<Brand[]> {
    const url = limit
        ? `${BRANDS_ENDPOINT}/popular?limit=${limit}`
        : `${BRANDS_ENDPOINT}/popular`;
    return apiGet<Brand[]>(url);
}

/**
 * Get luxury brands
 */
export async function getLuxuryBrands(limit?: number): Promise<Brand[]> {
    const url = limit
        ? `${BRANDS_ENDPOINT}/luxury?limit=${limit}`
        : `${BRANDS_ENDPOINT}/luxury`;
    return apiGet<Brand[]>(url);
}

