/**
 * Authentication API Module
 */
import { apiPost, setAuthToken, removeAuthToken } from '@/lib/api-client';
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/api';

const AUTH_ENDPOINT = '/auth';

/**
 * Login user
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiPost<LoginResponse>(`${AUTH_ENDPOINT}/login`, credentials);

    // Store token
    if (response.token) {
        setAuthToken(response.token, true); // Store in localStorage
    }

    return response;
}

/**
 * Register new user
 */
export async function register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiPost<LoginResponse>(`${AUTH_ENDPOINT}/register`, data);

    // Store token
    if (response.token) {
        setAuthToken(response.token, true);
    }

    return response;
}

/**
 * Logout user
 */
export function logout(): void {
    removeAuthToken();
}

/**
 * Refresh token
 */
export async function refreshToken(): Promise<{ token: string }> {
    const response = await apiPost<{ token: string }>(`${AUTH_ENDPOINT}/refresh`);

    if (response.token) {
        setAuthToken(response.token, true);
    }

    return response;
}

/**
 * Verify token
 */
export async function verifyToken(): Promise<{ valid: boolean }> {
    return apiPost<{ valid: boolean }>(`${AUTH_ENDPOINT}/verify`);
}

