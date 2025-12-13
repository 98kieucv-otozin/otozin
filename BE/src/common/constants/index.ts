// API Constants
export const API_PREFIX = 'api';
export const API_VERSION = 'v1';

// Database Constants
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Cache Constants
export const CACHE_TTL = 300; // 5 minutes
export const CACHE_MAX_ITEMS = 1000;

// Pagination Constants
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

// File Upload Constants
export const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/heif', 'image/webp'];

// Auth Constants
export const JWT_ACCESS_TOKEN_EXPIRES_IN = '24h'; // 24 hours (increased from 20m)
export const JWT_REFRESH_TOKEN_EXPIRES_IN = '7d';
export const PASSWORD_MIN_LENGTH = 8;
export const carBodyTypes = [
    'Sedan', 'SUV', 'Hatchback', 'Van / Minivan', 'Truck', 'Coupe', 'Wagon',
    'Convertible', 'UTE', 'Bus / Minibus', 'Bike', 'Machinery', 'Mini Vehicle', 'Other'
];
