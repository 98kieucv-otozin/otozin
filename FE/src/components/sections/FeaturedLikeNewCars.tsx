'use client';

import CarItemCard from '../ui/CarItemCard';
import Link from 'next/link';
import { useCarsForSale } from '@/hooks/useCars';
import { getImageUrl, formatPriceCar } from '@/utils';

// Helper function to format mileage
function formatMileage(odo?: number | null): string {
  if (!odo) return '';
  return `${odo.toLocaleString('vi-VN')} km`;
}

// Helper function to map fuel type
function mapFuelType(fuel?: string): { engine: string; engine_name: string } {
  if (!fuel) return { engine: 'petrol', engine_name: 'Xăng' };

  const fuelMap: Record<string, { engine: string; engine_name: string }> = {
    'petrol': { engine: 'petrol', engine_name: 'Xăng' },
    'diesel': { engine: 'diesel', engine_name: 'Dầu' },
    'electric': { engine: 'electric', engine_name: 'Điện' },
    'hybrid': { engine: 'hybrid', engine_name: 'Hybrid' },
  };

  return fuelMap[fuel.toLowerCase()] || { engine: 'petrol', engine_name: 'Xăng' };
}

export default function FeaturedLikeNewCars() {
  // Fetch featured cars for sale (limit to 8 to filter for featured ones)
  // Note: status filter is not part of CarFilters, so we'll filter on frontend
  const { data, error, isLoading } = useCarsForSale({
    limit: 8,
  });


  // Filter for active/featured cars, or use first 4 active cars if no featured cars
  const cars = data?.data || [];
  console.log(cars);
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-medium text-[#FD5E32] flex items-center gap-2">
            XE LƯỚT NỔI BẬT
          </h2>
          <Link href="/used-cars" className="text-[#FD5E32] text-md font-medium hover:underline">
            Xem tất cả &gt;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-sm p-0.5 flex flex-col h-full border border-gray-200 animate-pulse">
              <div className="w-full h-48 bg-gray-200 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-medium text-[#FD5E32] flex items-center gap-2">
            XE LƯỚT NỔI BẬT
          </h2>
          <Link href="/used-cars" className="text-[#FD5E32] text-md font-medium hover:underline">
            Xem tất cả &gt;
          </Link>
        </div>
        <div className="text-center text-gray-500 py-8">
          Không thể tải danh sách xe. Vui lòng thử lại sau.
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-[#FD5E32] flex items-center gap-2">
          XE LƯỚT NỔI BẬT
        </h2>
        <Link href="/used-cars" className="text-[#FD5E32] text-md font-medium hover:underline">
          Xem tất cả &gt;
        </Link>
      </div>
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {cars.map((car: any) => {
            const fuelInfo = mapFuelType(car.fuel);

            const imageUrl = getImageUrl(car.thumbnail);

            return (
              <CarItemCard
                key={car.id}
                car={{
                  name: car.title || 'Xe đã qua sử dụng',
                  price: formatPriceCar(Number(car.price)),
                  year: car.year || '',
                  km: formatMileage(car.odo),
                  transmission: car.transmission || 'Tự động',
                  seats: car.seats || 5,
                  engine: fuelInfo.engine,
                  engine_name: fuelInfo.engine_name,
                  displacement: car.displacement || '',
                  airbags: car.airbags || 0,
                  driver_train: car.drive || car.driver_train || 'FWD',
                  image: imageUrl,
                  uploadedAt: car.createdAt || new Date().toISOString(),
                  location: car.province || 'N/A',
                  description: car.description || '',
                }}
                status="like-new"
                link={`/used-cars/${car.id}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          Chưa có xe nổi bật nào.
        </div>
      )}
    </section>
  );
}
