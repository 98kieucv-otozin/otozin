export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format price as VND currency
 * @param price - Price in VND
 * @returns Formatted price string (e.g., "1.000.000 ₫")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

/**
 * Format price as triệu/tỷ (common format for car prices in Vietnam)
 * - Nếu >= 1 tỷ (1,000,000,000): format là "X tỷ" (số nguyên)
 * - Còn lại (< 1 tỷ): format là "X triệu" (số nguyên)
 * @param price - Price in VND (number or string)
 * @returns Formatted price string (e.g., "650 triệu", "5 tỷ")
 */
export function formatPriceCar(price: number): string {


  // Nếu >= 1 tỷ: format tỷ (số nguyên)
  if (price >= 1000) {
    return `${Math.round(price / 1000)} tỷ`;
  }

  // Còn lại: format triệu (số nguyên)
  return `${Math.round(price / 1000)} triệu`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Get image URL from environment variable or path
 * @param path - Image path (relative or absolute)
 * @param fallback - Fallback URL if path is empty or invalid
 * @returns Full image URL
 */
export function getImageUrl(path?: string | null, fallback?: string): string {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || '';

  // If no path provided, return fallback or empty string
  if (!path || path.trim() === '') {
    return fallback || '';
  }

  // If path is already a full URL (http:// or https://), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If path starts with /, it's an absolute path from base URL
  if (path.startsWith('/')) {
    // Remove trailing slash from base URL if exists
    const baseUrl = imageBaseUrl.endsWith('/') ? imageBaseUrl.slice(0, -1) : imageBaseUrl;
    return `${baseUrl}${path}`;
  }

  // Otherwise, it's a relative path
  const baseUrl = imageBaseUrl.endsWith('/') ? imageBaseUrl : `${imageBaseUrl}/`;
  return `${baseUrl}${path}`;
}

/**
 * Get image URL with default fallback
 * @param path - Image path (relative or absolute)
 * @returns Full image URL with default fallback
 */
export function getImageUrlWithFallback(path?: string | null, defaultImage: string = '/images/default-car.png'): string {
  const url = getImageUrl(path);
  return url || getImageUrl(defaultImage) || defaultImage;
}
