import Image from 'next/image';
import Link from 'next/link';
import CarStatusBadge from './CarStatusBadge';
import { UploadIcon, CalendarIcon, GaugeSimpleIcon, GearsIcon, SeatIcon, ChargingStationIcon, GasPumpIcon, SlidersIcon, LocationDotIcon } from '@/components/icons';
// icons imported from '@/components/icons'

export type CarStatus = 'new' | 'like-new' | 'old' | 'ev';

export interface CarItemCardProps {
  car: {
    year?: string | number;
    km?: string;
    transmission?: string;
    hopSo?: string;
    seats?: string | number;
    soGhe?: string;
    engine?: string;
    dongCo?: string;
    engine_name?: string;
    loaiNhienLieu?: string;
    displacement?: string;
    dungTich?: string;
    airbags?: string | number;
    tuiKhi?: string;
    driver_train?: string;
    image?: string | null;
    name: string;
    price: string | number;
    currency?: string;
    uploadedAt: string;
    location: string;
    description: string;
  };
  status: CarStatus;
  link: string;
}

export default function CarItemCard({ car, status, link }: CarItemCardProps) {
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN');
  }

  const year = car.year || '';
  const odo = car.km || '';
  const transmission = car.transmission || '';
  const seats = car.seats || '';
  const engine = car.engine || '';
  const engine_name = car.engine_name || '';
  const driver_train = car.driver_train || '';

  return (
    <div className="bg-white rounded-sm p-0.5 flex flex-col h-full border border-gray-200">
      {/* Link bọc ảnh, tên xe, giá xe */}
      <Link href={link} className="block group">
        <div className="w-full mb-3 bg-gray-100 flex items-center justify-center rounded-sm overflow-hidden relative">
          {/* Overlays on image */}
          <div className="absolute top-1 left-1 z-20 text-xs text-gray-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <UploadIcon className="w-3.5 h-3.5 text-[#FD5E32]" />
            {formatDate(car.uploadedAt)}
          </div>
          <div className="absolute top-1 right-1 z-30">
            <CarStatusBadge type={status === 'ev' ? 'like-new' : status} />
          </div>
          <Image
            src={car.image && String(car.image).trim() !== '' ? car.image : 'https://media.otozin.vn/sedan-car.png'}
            alt={car.name}
            width={320}
            height={180}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="grid grid-cols-[minmax(0,80%)_auto] items-start mb-2 gap-2">
          <div className="font-semibold text-gray-800 text-base break-words break-all">{car.name}</div>
          <div className="text-[#1e90ff] text-xl text-right">{car.price}{car.currency ? ` ${car.currency}` : ''}</div>
        </div>
      </Link>
      {/* Thông số kỹ thuật: 2 hàng, 3 cột */}
      <div className="grid grid-cols-3 gap-x-2 text-sm text-gray-700 mb-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1"><CalendarIcon className="w-5 h-5 text-gray-400" /> {year}</div>
          <div className="flex items-center gap-1"><SeatIcon className="w-5 h-5 text-gray-400" /> {seats}</div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1"><GaugeSimpleIcon className="w-5 h-5 text-gray-400" /> {odo}</div>
          <div className="flex items-center gap-1"><GearsIcon className="w-5 h-5 text-gray-400" /> {transmission}</div>
        </div>
        <div className="flex flex-col space-y-2 ml-2">
          <div className="flex items-center gap-1">
            {engine === 'petrol' || engine === 'diesel' ? (
              <GasPumpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChargingStationIcon className="w-5 h-5 text-gray-400" />
            )}
            {engine_name}
          </div>
          <div className="flex items-center gap-1"><SlidersIcon className="w-5 h-5 text-gray-400" /> {driver_train}</div>

        </div>

      </div>
      {/* Địa điểm + mô tả */}
      <div className="flex items-center text-sm text-[#FD5E32] mb-1">
        <LocationDotIcon className="w-4 h-4 mr-1" /> {car.location}
      </div>
      <div className="text-sm text-gray-800 line-clamp-2">{car.description}</div>
    </div>
  );
} 