import Image from 'next/image';
import Link from 'next/link';
import { LocationDotIcon, StarIcon, CarIcon, PhoneIcon } from '@/components/icons';

const trustedShowrooms = [
  {
    id: 1,
    name: 'Showroom Hà Nội',
    address: '123 Đường ABC, Quận 1, Hà Nội',
    phone: '024-1234-5678',
    rating: 4.8,
    reviews: 156,
    image: 'https://media.otozin.vn/showroom1.jpg',
    cars: 45
  },
  {
    id: 2,
    name: 'Showroom TP.HCM',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    phone: '028-9876-5432',
    rating: 4.9,
    reviews: 203,
    image: 'https://media.otozin.vn/showroom2.jpg',
    cars: 67
  },
  {
    id: 3,
    name: 'Showroom Đà Nẵng',
    address: '789 Đường DEF, Quận Hải Châu, Đà Nẵng',
    phone: '0236-1111-2222',
    rating: 4.7,
    reviews: 89,
    image: 'https://media.otozin.vn/showroom3.jpg',
    cars: 34
  },
  {
    id: 4,
    name: 'Showroom Cần Thơ',
    address: '321 Đường GHI, Quận Ninh Kiều, Cần Thơ',
    phone: '0292-3333-4444',
    rating: 4.6,
    reviews: 67,
    image: 'https://media.otozin.vn/showroom4.jpg',
    cars: 28
  }
];

export default function FeaturesTrustedShowrooms() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-[#FD5E32] flex items-center gap-2">
          SHOWROOM UY TÍN
        </h2>
        <Link href="/showrooms" className="text-[#FD5E32] text-md font-medium hover:underline">
          Xem tất cả &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {trustedShowrooms.map(showroom => (
          <div key={showroom.id} className="bg-white rounded-lg p-4 flex flex-col h-full border border-gray-200 hover:shadow-lg transition-shadow">
            {/* Showroom Image */}
            <Link href={`/showrooms/${showroom.id}`} className="block group mb-3">
              <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3">
                <Image
                  src={showroom.image && String(showroom.image).trim() !== '' ? showroom.image : 'https://media.otozin.vn/sedan-car.png'}
                  alt={showroom.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
            </Link>

            {/* Showroom Name */}
            <Link href={`/showrooms/${showroom.id}`} className="block group">
              <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-[#FD5E32] transition-colors">
                {showroom.name}
              </h3>
            </Link>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <StarIcon className="text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">{showroom.rating}</span>
                <span className="text-xs text-gray-500">({showroom.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#1e90ff]">
                <CarIcon className="text-gray-400" />
                <span>{showroom.cars} xe</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start text-sm text-gray-600 mb-2">
              <LocationDotIcon className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{showroom.address}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center text-sm text-gray-800 mb-3">
              <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
              {showroom.phone}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 