# API Modules Documentation

Cấu trúc module API được tổ chức theo chức năng để dễ quản lý và sử dụng.

## Cấu trúc

```
src/
├── lib/
│   └── api-client.ts      # API client chính với error handling và authentication
├── api/
│   ├── cars.ts           # API cho xe hơi
│   ├── brands.ts         # API cho thương hiệu
│   ├── provinces.ts      # API cho tỉnh thành
│   ├── auth.ts           # API cho authentication
│   ├── search.ts         # API cho tìm kiếm
│   └── index.ts          # Export tất cả API modules
├── hooks/
│   ├── useCars.ts        # Hooks cho cars API
│   ├── useBrands.ts      # Hooks cho brands API
│   ├── useProvinces.ts   # Hooks cho provinces API
│   └── useSearch.ts      # Hooks cho search API
└── types/
    └── api.ts            # Types cho API requests/responses
```

## Cấu hình

Thiết lập biến môi trường trong `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# hoặc
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Cách sử dụng

### 1. Sử dụng Hooks (Khuyến nghị)

```tsx
import { useCars, useFeaturedCars } from '@/hooks/useCars';
import { useBrands } from '@/hooks/useBrands';
import { useSearch } from '@/hooks/useSearch';

function CarList() {
  // Fetch cars với filters
  const { data, error, isLoading } = useCars({
    page: 1,
    limit: 10,
    brandId: 1,
    status: 'new'
  });

  // Fetch featured cars
  const { data: featured } = useFeaturedCars(5);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map(car => (
        <div key={car.id}>{car.model}</div>
      ))}
    </div>
  );
}
```

### 2. Sử dụng API Functions trực tiếp

```tsx
import { getCars, getCarById } from '@/api/cars';
import { login } from '@/api/auth';

// Trong Server Component hoặc API Route
async function fetchCars() {
  const result = await getCars({
    page: 1,
    limit: 10,
    brandId: 1
  });
  return result;
}

// Login
async function handleLogin(username: string, password: string) {
  try {
    const response = await login({ username, password });
    // Token đã được lưu tự động
    console.log('User:', response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

### 3. Search với state management

```tsx
import { useSearch } from '@/hooks/useSearch';

function SearchComponent() {
  const { query, results, total, isSearching, handleSearch } = useSearch();

  return (
    <div>
      <input
        type="text"
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
```

## Authentication

Token được tự động quản lý:

```tsx
import { login, logout, setAuthToken } from '@/api/auth';
import { getAuthToken } from '@/lib/api-client';

// Login - token tự động được lưu
await login({ username: 'user', password: 'pass' });

// Logout - token tự động bị xóa
logout();

// Lấy token thủ công
const token = getAuthToken();

// Set token thủ công (nếu cần)
setAuthToken('your-token', true); // true = lưu vào localStorage
```

## Error Handling

API client tự động xử lý lỗi:

```tsx
import { ApiException } from '@/lib/api-client';
import { getCars } from '@/api/cars';

try {
  const cars = await getCars();
} catch (error) {
  if (error instanceof ApiException) {
    console.error('API Error:', error.message);
    console.error('Status:', error.status);
    console.error('Errors:', error.errors);
    
    // 401 Unauthorized - tự động redirect đến /login
    // Các lỗi khác có thể xử lý tùy chỉnh
  }
}
```

## API Modules

### Cars API (`@/api/cars`)

- `getCars(filters?)` - Lấy danh sách xe với filters và pagination
- `getCarById(id)` - Lấy thông tin một xe
- `createCar(data)` - Tạo xe mới
- `updateCar(id, data)` - Cập nhật xe
- `deleteCar(id)` - Xóa xe
- `getFeaturedCars(limit?)` - Lấy xe nổi bật
- `getNewCars(limit?)` - Lấy xe mới
- `getLikeNewCars(limit?)` - Lấy xe như mới
- `getBestSellingEVs(limit?)` - Lấy EV bán chạy

### Brands API (`@/api/brands`)

- `getBrands()` - Lấy tất cả thương hiệu
- `getBrandById(id)` - Lấy thông tin một thương hiệu
- `getPopularBrands(limit?)` - Lấy thương hiệu phổ biến
- `getLuxuryBrands(limit?)` - Lấy thương hiệu cao cấp

### Provinces API (`@/api/provinces`)

- `getProvinces()` - Lấy tất cả tỉnh thành
- `getProvinceById(id)` - Lấy thông tin một tỉnh
- `getProvincesByRegion(region)` - Lấy tỉnh theo miền

### Auth API (`@/api/auth`)

- `login(credentials)` - Đăng nhập
- `register(data)` - Đăng ký
- `logout()` - Đăng xuất
- `refreshToken()` - Làm mới token
- `verifyToken()` - Xác thực token

### Search API (`@/api/search`)

- `searchCars(params)` - Tìm kiếm xe
- `getSearchSuggestions(query, limit?)` - Lấy gợi ý tìm kiếm
- `getPopularSearches(limit?)` - Lấy tìm kiếm phổ biến
- `quickSearch(query, filters?)` - Tìm kiếm nhanh

## Best Practices

1. **Sử dụng Hooks trong Client Components**: Dùng `useCars`, `useBrands`, etc. trong React components
2. **Sử dụng API Functions trong Server Components**: Dùng `getCars`, `getBrands`, etc. trong Server Components hoặc API Routes
3. **Error Handling**: Luôn wrap API calls trong try-catch
4. **Type Safety**: Sử dụng types từ `@/types/api` để đảm bảo type safety
5. **SWR Caching**: Hooks tự động cache và revalidate, không cần quản lý state thủ công

## Migration từ code cũ

Nếu bạn đang dùng `@/utils/api`, có thể migrate dần:

```tsx
// Cũ
import { apiFetch } from '@/utils/api';
const data = await apiFetch('/cars');

// Mới
import { apiGet } from '@/lib/api-client';
const data = await apiGet('/cars');

// Hoặc tốt hơn, dùng hooks
import { useCars } from '@/hooks/useCars';
const { data } = useCars();
```

