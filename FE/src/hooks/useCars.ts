/**
 * Cars Hooks - React hooks for car-related API calls
 */
import useSWR from 'swr';
import { useCallback } from 'react';
import { getCars, getCarById, getFeaturedCars, getNewCars, getLikeNewCars, getBestSellingEVs, getCarsForSale } from '@/api/cars';
import type { Car, CarFilters, PaginatedResponse } from '@/types/api';

/**
 * Hook to fetch cars with filters
 */
export function useCars(filters?: CarFilters) {
    const key = filters ? ['cars', filters] : 'cars';
    return useSWR<PaginatedResponse<Car>>(key, () => getCars(filters));
}

/**
 * Hook to fetch a single car by ID
 */
export function useCar(id: number | null) {
    return useSWR<Car>(id ? ['car', id] : null, () => getCarById(id!));
}

/**
 * Hook to fetch featured cars
 */
export function useFeaturedCars(limit = 10) {
    return useSWR<Car[]>(['cars', 'featured', limit], () => getFeaturedCars(limit));
}

/**
 * Hook to fetch new cars
 */
export function useNewCars(limit = 10) {
    return useSWR<Car[]>(['cars', 'new', limit], () => getNewCars(limit));
}

/**
 * Hook to fetch like-new cars
 */
export function useLikeNewCars(limit = 10) {
    return useSWR<Car[]>(['cars', 'like-new', limit], () => getLikeNewCars(limit));
}

/**
 * Hook to fetch best selling EVs
 */
export function useBestSellingEVs(limit = 10) {
    return useSWR<Car[]>(['cars', 'best-selling-evs', limit], () => getBestSellingEVs(limit));
}

/**
 * Hook to fetch cars for sale with filters and pagination
 */
export function useCarsForSale(filters?: CarFilters) {
    const key = filters ? ['cars', 'for-sale', filters] : ['cars', 'for-sale'];
    return useSWR<PaginatedResponse<Car>>(key, () => getCarsForSale(filters));
}

/**
 * Hook for car mutations (create, update, delete)
 */
export function useCarMutations() {
    const { mutate } = useSWR('cars');

    const refreshCars = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        refreshCars,
    };
}

