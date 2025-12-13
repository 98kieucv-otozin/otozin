import CarItemCard from '../ui/CarItemCard';
import Link from 'next/link';

const oldOriginalCars = [
  {
    id: 1,
    name: 'Toyota Camry 2018',
    price: '800 triệu',
    year: 2018,
    km: '45,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '2.5L',
    airbags: 7,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/old-car.webp',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Toyota Camry 2018 zin 100%, bảo dưỡng định kỳ, máy móc hoạt động tốt'
  },
  {
    id: 2,
    name: 'Honda Civic 2019',
    price: '750 triệu',
    year: 2019,
    km: '38,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.5L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/old-car.webp',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Honda Civic 2019 zin 100%, máy móc nguyên bản, nội thất đẹp'
  },
  {
    id: 3,
    name: 'Mazda 3 2020',
    price: '700 triệu',
    year: 2020,
    km: '32,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '2.0L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/old-car.webp',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Mazda 3 2020 zin 100%, thiết kế đẹp, vận hành mượt mà'
  },
  {
    id: 4,
    name: 'Kia Cerato 2019',
    price: '650 triệu',
    year: 2019,
    km: '42,000 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.6L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/old-car.webp',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Kia Cerato 2019 zin 100%, giá tốt, tiết kiệm nhiên liệu'
  }
];

export default function FeaturesOldOriginalCars() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-[#FD5E32] flex items-center gap-2">
          XE ZIN CŨ
        </h2>
        <Link href="/old-original-cars" className="text-[#FD5E32] text-md font-medium hover:underline">
          Xem tất cả &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {oldOriginalCars.map(car => (
          <CarItemCard key={car.id} car={car} status="old" link={`/old-original-cars/${car.id}`} />
        ))}
      </div>
    </section>
  );
} 