/**
 * Example usage of API modules
 * This file demonstrates how to use the API modules in different scenarios
 */

'use client';

import { useCars, useFeaturedCars } from '@/hooks/useCars';
import { useBrands } from '@/hooks/useBrands';
import { useSearch } from '@/hooks/useSearch';
import { login } from '@/api/auth';
import { getCars } from '@/api/cars';

// Example 1: Using hooks in Client Component
export function CarListExample() {
  const { data, error, isLoading } = useCars({
    page: 1,
    limit: 10,
    brandId: 1,
    status: 'new'
  });

  const { data: featured } = useFeaturedCars(5);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Featured Cars</h2>
      {featured?.map(car => (
        <div key={car.id}>{car.model}</div>
      ))}
      
      <h2>All Cars</h2>
      {data?.data.map(car => (
        <div key={car.id}>{car.model} - {car.price}</div>
      ))}
    </div>
  );
}

// Example 2: Using search hook
export function SearchExample() {
  const { query, results, total, isSearching, handleSearch } = useSearch();

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Tìm kiếm xe..."
      />
      {isSearching && <div>Đang tìm kiếm...</div>}
      <div>
        Tìm thấy {total} kết quả
        {results.map(car => (
          <div key={car.id}>{car.model}</div>
        ))}
      </div>
    </div>
  );
}

// Example 3: Using brands hook
export function BrandsExample() {
  const { data: brands, isLoading } = useBrands();

  if (isLoading) return <div>Loading brands...</div>;

  return (
    <div>
      {brands?.map(brand => (
        <div key={brand.id}>{brand.name}</div>
      ))}
    </div>
  );
}

// Example 4: Server Component usage (in a Server Component file)
export async function ServerCarList() {
  // In a Server Component, use API functions directly
  const carsData = await getCars({
    page: 1,
    limit: 10
  });

  return (
    <div>
      {carsData.data.map(car => (
        <div key={car.id}>{car.model}</div>
      ))}
    </div>
  );
}

// Example 5: Login handler
export async function LoginExample() {
  async function handleLogin(username: string, password: string) {
    'use client';
    
    try {
      const response = await login({ username, password });
      // Token đã được lưu tự động
      console.log('Logged in as:', response.user.username);
      // Redirect or update UI
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login failed:', error.message);
      }
    }
  }

  return handleLogin;
}

