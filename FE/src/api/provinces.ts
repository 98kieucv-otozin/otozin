/**
 * Provinces API Module
 */
import { apiGet } from '@/lib/api-client';
import type { Province } from '@/types/api';

const PROVINCES_ENDPOINT = '/provinces';

/**
 * Get all provinces
 */
export async function getProvinces(): Promise<Province[]> {
    return apiGet<Province[]>(PROVINCES_ENDPOINT);
}

/**
 * Get a single province by ID
 */
export async function getProvinceById(id: number): Promise<Province> {
    return apiGet<Province>(`${PROVINCES_ENDPOINT}/${id}`);
}

/**
 * Get provinces by region
 */
export async function getProvincesByRegion(region: string): Promise<Province[]> {
    return apiGet<Province[]>(`${PROVINCES_ENDPOINT}/region/${region}`);
}

