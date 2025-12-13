import CarItemCard from '../ui/CarItemCard';
import Link from 'next/link';

const newCars = [
  {
    id: 1,
    name: 'Toyota Camry',
    price: '1.8 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '2.5L',
    airbags: 7,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/camry.jpg',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Toyota Camry 2024 mới nhất với thiết kế hiện đại và công nghệ tiên tiến'
  },
  {
    id: 2,
    name: 'Honda Accord',
    price: '1.6 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.5L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/accord.jpg',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Honda Accord 2024 với động cơ turbo và thiết kế thể thao'
  },
  {
    id: 3,
    name: 'Mazda 6',
    price: '1.4 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '2.0L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/mazda6.jpg',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Mazda 6 2024 với thiết kế Kodo và công nghệ Skyactiv'
  },
  {
    id: 4,
    name: 'Kia K5',
    price: '1.2 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'petrol',
    engine_name: 'Xăng',
    displacement: '1.6L',
    airbags: 6,
    driver_train: 'FWD',
    image: 'https://media.otozin.vn/kia-k5.jpg',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Kia K5 2024 với thiết kế hiện đại và nhiều tiện nghi'
  }
];

export default function FeaturesNewCars() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-[#FD5E32] flex items-center gap-2">
          XE MỚI BÁN CHẠY
        </h2>
        <Link href="/new-cars" className="text-[#FD5E32] text-md font-medium hover:underline">
          Xem tất cả &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {newCars.map(car => (
          <CarItemCard key={car.id} car={car} status="new" link={`/new-cars/${car.id}`} />
        ))}
      </div>
    </section>
  );
} 