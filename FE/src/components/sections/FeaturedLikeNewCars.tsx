import CarItemCard from '../ui/CarItemCard';
import Link from 'next/link';

const likeNewCars = [
  {
    id: 1,
    name: 'Toyota Vios 2023',
    price: '650 triệu',
    year: 2023,
    km: '15,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.5L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/like-new-car.webp',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Toyota Vios 2023 như mới, ít sử dụng, máy móc hoạt động tốt'
  },
  {
    id: 2,
    name: 'Honda City 2023',
    price: '600 triệu',
    year: 2023,
    km: '18,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.5L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/like-new-car.webp',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Honda City 2023 như mới, bảo dưỡng định kỳ, nội thất đẹp'
  },
  {
    id: 3,
    name: 'Mazda 2 2023',
    price: '580 triệu',
    year: 2023,
    km: '20,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.5L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/like-new-car.webp',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Mazda 2 2023 như mới, thiết kế đẹp, vận hành mượt mà'
  },
  {
    id: 4,
    name: 'Kia Morning 2023',
    price: '520 triệu',
    year: 2023,
    km: '22,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.2L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/like-new-car.webp',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Kia Morning 2023 như mới, tiết kiệm nhiên liệu, dễ điều khiển'
  }
];


export default function FeaturedLikeNewCars() {
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
        {likeNewCars.map(car => (
          <CarItemCard key={car.id} car={car} status="like-new" link={`/used-cars/${car.id}`} />
        ))}
      </div>
    </section>
  );
} 