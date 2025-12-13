/**
 * Generic API Hook - Use SWR with the new API client
 * @deprecated Use specific hooks like useCars, useBrands, etc. instead
 */
import useSWR from 'swr';
import { apiGet } from '@/lib/api-client';

export function useApi<T>(url: string) {
  return useSWR<T>(url, (endpoint: string) => apiGet<T>(endpoint));
} 