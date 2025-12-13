import Image from 'next/image';
import Link from 'next/link';
import { POPULAR_BRANDS, LUXURY_BRANDS } from '@/constants/carBrands';

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 bg-white" aria-labelledby="features-heading">

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Bạn Tìm Xe Kiểu Nào?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Sedan */}
        <Link href="/cars/sedan" className="block rounded-xl overflow-hidden transition-all duration-300 group h-28 flex flex-col items-center justify-center">
          <Image
            src="https://media.otozin.vn/sedan-car.png"
            alt="Sedan"
            width={400}
            height={256}
            className="w-4/5 h-4/5 object-contain group-hover:scale-125 transition-transform duration-300"
          />
          <span className="text-lg font-medium text-[#FD5E32] mt-1">SEDAN</span>
        </Link>

        {/* SUV */}
        <Link href="/cars/suv" className="block rounded-xl overflow-hidden transition-all duration-300 group h-28 flex flex-col items-center justify-center">
          <Image
            src="https://media.otozin.vn/suv-car.png"
            alt="SUV"
            width={400}
            height={256}
            className="w-4/5 h-4/5 object-contain group-hover:scale-125 transition-transform duration-300"
          />
          <span className="text-lg font-medium text-[#FD5E32] mt-1">SUV</span>
        </Link>

        {/* MPV */}
        <Link href="/cars/mpv" className="block rounded-xl overflow-hidden transition-all duration-300 group h-28 flex flex-col items-center justify-center">
          <Image
            src="https://media.otozin.vn/mpv-car.png"
            alt="MPV"
            width={400}
            height={256}
            className="w-4/5 h-4/5 object-contain group-hover:scale-125 transition-transform duration-300"
          />
          <span className="text-lg font-medium text-[#FD5E32] mt-1">MPV</span>
        </Link>

        {/* Truck */}
        <Link href="/cars/truck" className="block rounded-xl overflow-hidden transition-all duration-300 group h-28 flex flex-col items-center justify-center">
          <Image
            src="https://media.otozin.vn/truck-car.png"
            alt="Truck"
            width={400}
            height={256}
            className="w-4/5 h-4/5 object-contain group-hover:scale-125 transition-transform duration-300"
          />
          <span className="text-lg font-medium text-[#FD5E32] mt-1">BÁN TẢI</span>
        </Link>
      </div>

      {/* Car Brands Section - Side by Side */}
      <div className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Car Brands - Left Side (2/3) */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Tìm Xe Hãng Ưa Chuộng
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
              {POPULAR_BRANDS.map((brand) => (
                <Link
                  key={brand.name}
                  href={brand.link}
                  className="block bg-white dark:bg-gray-800 rounded-sm p-2 shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#FD5E32] h-24"
                >
                  <div className="flex flex-col items-center h-full justify-between">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={60}
                      height={60}
                      className="w-12 h-12 object-contain group-hover:scale-130 transition-transform duration-300"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {brand.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Luxury Car Brands - Right Side (1/3) */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Tìm Xe Sang
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 gap-2">
              {LUXURY_BRANDS.map((brand) => (
                <Link
                  key={brand.name}
                  href={brand.link}
                  className="block bg-white dark:bg-gray-800 rounded-sm p-2 shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#FD5E32] h-24"
                >
                  <div className="flex flex-col items-center h-full justify-between">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={60}
                      height={60}
                      className="w-12 h-12 object-contain group-hover:scale-130 transition-transform duration-300"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {brand.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 