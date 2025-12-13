/**
 * API Client - Centralized API configuration and utilities
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export class ApiException extends Error {
    status: number;
    errors?: Record<string, string[]>;

    constructor(message: string, status: number, errors?: Record<string, string[]>) {
        super(message);
        this.name = 'ApiException';
        this.status = status;
        this.errors = errors;
    }
}

/**
 * Get authentication token from storage
 */
function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
}

/**
 * Set authentication token
 */
export function setAuthToken(token: string, persistent = false): void {
    if (typeof window === 'undefined') return;
    if (persistent) {
        localStorage.setItem('auth_token', token);
    } else {
        sessionStorage.setItem('auth_token', token);
    }
}

/**
 * Remove authentication token
 */
export function removeAuthToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
}

/**
 * Base API fetch function with error handling
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');

        if (!response.ok) {
            let errorData: ApiError;

            if (isJson) {
                errorData = await response.json();
            } else {
                errorData = {
                    message: response.statusText || 'An error occurred',
                    status: response.status,
                };
            }

            // Handle 401 Unauthorized - clear token and redirect
            if (response.status === 401) {
                removeAuthToken();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }

            throw new ApiException(
                errorData.message || 'An error occurred',
                response.status,
                errorData.errors
            );
        }

        // Handle empty responses
        if (response.status === 204 || !isJson) {
            return {} as T;
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiException) {
            throw error;
        }

        // Network errors
        throw new ApiException(
            error instanceof Error ? error.message : 'Network error occurred',
            0
        );
    }
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return apiRequest<T>(endpoint, {
        ...options,
        method: 'GET',
    });
}

/**
 * POST request
 */
export async function apiPost<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
): Promise<T> {
    return apiRequest<T>(endpoint, {
        ...options,
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * PUT request
 */
export async function apiPut<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
): Promise<T> {
    return apiRequest<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * PATCH request
 */
export async function apiPatch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
): Promise<T> {
    return apiRequest<T>(endpoint, {
        ...options,
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return apiRequest<T>(endpoint, {
        ...options,
        method: 'DELETE',
    });
}

/**
 * Upload file
 */
export async function apiUpload<T>(
    endpoint: string,
    file: File | FormData,
    options?: RequestInit
): Promise<T> {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        ...(options?.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData, browser will set it with boundary
    if (!(file instanceof FormData)) {
        headers['Content-Type'] = 'multipart/form-data';
    }

    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    const formData = file instanceof FormData ? file : (() => {
        const fd = new FormData();
        fd.append('file', file);
        return fd;
    })();

    try {
        const response = await fetch(url, {
            ...options,
            method: 'POST',
            headers,
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: response.statusText || 'Upload failed',
                status: response.status,
            }));

            throw new ApiException(
                errorData.message || 'Upload failed',
                response.status,
                errorData.errors
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiException) {
            throw error;
        }

        throw new ApiException(
            error instanceof Error ? error.message : 'Upload failed',
            0
        );
    }
}

export { API_URL };

