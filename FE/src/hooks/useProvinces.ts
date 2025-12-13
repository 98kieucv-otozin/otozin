/**
 * Provinces Hooks - React hooks for province-related API calls
 */
import useSWR from 'swr';
import { getProvinces, getProvinceById, getProvincesByRegion } from '@/api/provinces';
import type { Province } from '@/types/api';

/**
 * Hook to fetch all provinces
 */
export function useProvinces() {
    return useSWR<Province[]>('provinces', getProvinces);
}

/**
 * Hook to fetch a single province by ID
 */
export function useProvince(id: number | null) {
    return useSWR<Province>(id ? ['province', id] : null, () => getProvinceById(id!));
}

/**
 * Hook to fetch provinces by region
 */
export function useProvincesByRegion(region: string | null) {
    return useSWR<Province[]>(
        region ? ['provinces', 'region', region] : null,
        () => getProvincesByRegion(region!)
    );
}

