import CarItemCard from '../ui/CarItemCard';
import Link from 'next/link';

const bestSellingEVs = [
  {
    id: 1,
    name: 'VinFast VF8',
    price: '1.2 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 7,
    engine: 'ev',
    engine_name: 'Điện',
    displacement: 'N/A',
    airbags: 8,
    driver_train: 'AWD',
    image: 'https://media.otozin.vn/vf8.jpg',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Xe điện VinFast VF8 mới nhất với công nghệ tiên tiến'
  },
  {
    id: 2,
    name: 'Tesla Model 3',
    price: '2.5 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'ev',
    engine_name: 'Điện',
    displacement: 'N/A',
    airbags: 8,
    driver_train: 'RWD',
    image: 'https://media.otozin.vn/tesla-model3.jpg',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Tesla Model 3 với hiệu suất cao và công nghệ tự lái'
  },
  {
    id: 3,
    name: 'Hyundai IONIQ 5',
    price: '1.8 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'ev',
    engine_name: 'Điện',
    displacement: 'N/A',
    airbags: 7,
    driver_train: 'AWD',
    image: 'https://media.otozin.vn/ioniq5.jpg',
    uploadedAt: '2024-01-15',
    location: 'Hà Nội',
    description: 'Hyundai IONIQ 5 thiết kế hiện đại, công nghệ tiên tiến'
  },
  {
    id: 4,
    name: 'Kia EV6',
    price: '2.0 tỷ',
    year: 2024,
    km: '0 km',
    transmission: 'Tự động',
    seats: 5,
    engine: 'ev',
    engine_name: 'Điện',
    displacement: 'N/A',
    airbags: 7,
    driver_train: 'AWD',
    image: 'https://media.otozin.vn/kia-ev6.jpg',
    uploadedAt: '2024-01-15',
    location: 'TP.HCM',
    description: 'Kia EV6 với thiết kế độc đáo và hiệu suất cao'
  }
];

export default function FeaturesBestSellingEVs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-[#FD5E32] flex items-center gap-2">
          XE ĐIỆN BÁN CHẠY
        </h2>
        <Link href="/electric-cars" className="text-[#FD5E32] text-md font-medium hover:underline">
          Xem tất cả &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {bestSellingEVs.map(car => (
          <CarItemCard key={car.id} car={car} status="ev" link={`/electric-cars/${car.id}`} />
        ))}
      </div>
    </section>
  );
} 