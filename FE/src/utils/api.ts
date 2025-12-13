/**
 * Legacy API utilities - Re-exported from new API client for backward compatibility
 * @deprecated Use @/lib/api-client and @/api modules instead
 */
import { apiGet as apiFetch, apiPost as postApi, API_URL } from '@/lib/api-client';
import { login as authLogin } from '@/api/auth';

// Re-export for backward compatibility
export { apiFetch, postApi, API_URL };

/**
 * @deprecated Use login from '@/api/auth' instead
 */
export async function login(username: string, password: string) {
  return authLogin({ username, password });
} 