/**
 * Brands Hooks - React hooks for brand-related API calls
 */
import useSWR from 'swr';
import { getBrands, getBrandById, getPopularBrands, getLuxuryBrands } from '@/api/brands';
import type { Brand } from '@/types/api';

/**
 * Hook to fetch all brands
 */
export function useBrands() {
    return useSWR<Brand[]>('brands', getBrands);
}

/**
 * Hook to fetch a single brand by ID
 */
export function useBrand(id: number | null) {
    return useSWR<Brand>(id ? ['brand', id] : null, () => getBrandById(id!));
}

/**
 * Hook to fetch popular brands
 */
export function usePopularBrands(limit?: number) {
    return useSWR<Brand[]>(['brands', 'popular', limit], () => getPopularBrands(limit));
}

/**
 * Hook to fetch luxury brands
 */
export function useLuxuryBrands(limit?: number) {
    return useSWR<Brand[]>(['brands', 'luxury', limit], () => getLuxuryBrands(limit));
}

