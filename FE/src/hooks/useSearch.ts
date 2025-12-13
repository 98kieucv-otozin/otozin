/**
 * Search Hooks - React hooks for search-related API calls
 */
import useSWR from 'swr';
import { useState, useCallback } from 'react';
import { searchCars, getSearchSuggestions, getPopularSearches, quickSearch } from '@/api/search';
import type { SearchParams, SearchResponse, CarFilters } from '@/types/api';

/**
 * Hook to search cars
 */
export function useSearchCars(params: SearchParams | null) {
    return useSWR<SearchResponse>(
        params ? ['search', 'cars', params] : null,
        () => searchCars(params!)
    );
}

/**
 * Hook to get search suggestions
 */
export function useSearchSuggestions(query: string | null, limit = 5) {
    return useSWR<string[]>(
        query ? ['search', 'suggestions', query, limit] : null,
        () => getSearchSuggestions(query!, limit)
    );
}

/**
 * Hook to get popular searches
 */
export function usePopularSearches(limit = 10) {
    return useSWR<string[]>(['search', 'popular', limit], () => getPopularSearches(limit));
}

/**
 * Hook for search with state management
 */
export function useSearch() {
    const [query, setQuery] = useState<string>('');
    const [filters, setFilters] = useState<CarFilters | undefined>();
    const [isSearching, setIsSearching] = useState(false);

    const { data, error, mutate } = useSWR<SearchResponse>(
        query ? ['search', query, filters] : null,
        () => quickSearch(query, filters),
        {
            revalidateOnFocus: false,
        }
    );

    const handleSearch = useCallback(async (searchQuery: string, searchFilters?: CarFilters) => {
        setQuery(searchQuery);
        setFilters(searchFilters);
        setIsSearching(true);

        try {
            await mutate();
        } finally {
            setIsSearching(false);
        }
    }, [mutate]);

    const clearSearch = useCallback(() => {
        setQuery('');
        setFilters(undefined);
    }, []);

    return {
        query,
        filters,
        results: data?.cars || [],
        total: data?.total || 0,
        suggestions: data?.suggestions || [],
        isSearching,
        error,
        handleSearch,
        clearSearch,
        setFilters,
    };
}

