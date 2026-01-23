/**
 * URL utility functions
 */

/**
 * Extract UUID or filename from URL
 * Lấy phần cuối cùng sau dấu / cuối cùng từ URL
 *
 * @param url - URL string
 * @returns UUID/filename string
 *
 * @example
 * extractUuidFromUrl("https://example.com/car-for-sale/123e4567-e89b-12d3-a456-426614174000")
 * // Returns: "123e4567-e89b-12d3-a456-426614174000"
 *
 * @example
 * extractUuidFromUrl("https://example.com/cms-posts/uuid-123")
 * // Returns: "uuid-123"
 */
export function extractUuidFromUrl(url: string): string {
  // Lấy phần cuối cùng sau dấu / cuối cùng
  const parts = url.split("/");
  return parts[parts.length - 1];
}

/**
 * Extract UUID from URL and remove query parameters
 * Lấy UUID từ URL sau khi bỏ query params
 *
 * @param url - URL string
 * @returns UUID/filename string
 *
 * @example
 * extractUuidFromUrlWithQuery("https://example.com/car-for-sale/uuid-123?X-Amz-Algorithm=...")
 * // Returns: "uuid-123"
 */
export function extractUuidFromUrlWithQuery(url: string): string {
  // Bỏ query params trước
  const urlWithoutQuery = url.split("?")[0];
  // Sau đó extract UUID
  return extractUuidFromUrl(urlWithoutQuery) as string;
}

/**
 * Get image URL from environment variable or path
 * Sử dụng import.meta.env cho Vite (thay vì process.env)
 *
 * @param path - Image path (UUID hoặc filename)
 * @param bucket - Bucket/subfolder name (optional)
 * @returns Full image URL
 *
 * @example
 * getImageUrl("uuid-123", "cms-posts")
 * // Returns: "https://cdn.example.com/cms-posts/uuid-123"
 */
export function getImageUrl(path?: string, bucket?: string): string {
  if (!path) {
    return '';
  }

  // Sử dụng import.meta.env cho Vite
  const imageBaseUrl = import.meta.env.VITE_IMAGE_URL || import.meta.env.VITE_R2_PUBLIC_URL || '';

  if (!imageBaseUrl) {
    return path; // Return path as is if no base URL configured
  }

  // If path is already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Construct URL with bucket if provided
  const baseUrl = imageBaseUrl.endsWith('/') ? imageBaseUrl.slice(0, -1) : imageBaseUrl;

  if (bucket) {
    return `${baseUrl}/${bucket}/${path}`;
  }

  return `${baseUrl}/${path}`;
}
