/**
 * Search API Module
 */
import { apiGet, apiPost } from '@/lib/api-client';
import type { SearchParams, SearchResponse, CarFilters } from '@/types/api';

const SEARCH_ENDPOINT = '/search';

/**
 * Search cars
 */
export async function searchCars(params: SearchParams): Promise<SearchResponse> {
    return apiPost<SearchResponse>(`${SEARCH_ENDPOINT}/cars`, params);
}

/**
 * Get search suggestions
 */
export async function getSearchSuggestions(query: string, limit = 5): Promise<string[]> {
    return apiGet<string[]>(`${SEARCH_ENDPOINT}/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`);
}

/**
 * Get popular searches
 */
export async function getPopularSearches(limit = 10): Promise<string[]> {
    return apiGet<string[]>(`${SEARCH_ENDPOINT}/popular?limit=${limit}`);
}

/**
 * Quick search (simple query string)
 */
export async function quickSearch(query: string, filters?: CarFilters): Promise<SearchResponse> {
    const params = new URLSearchParams();
    params.append('q', query);

    if (filters) {
        if (filters.brandId) params.append('brandId', filters.brandId.toString());
        if (filters.provinceId) params.append('provinceId', filters.provinceId.toString());
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.status) params.append('status', filters.status);
    }

    return apiGet<SearchResponse>(`${SEARCH_ENDPOINT}?${params.toString()}`);
}

