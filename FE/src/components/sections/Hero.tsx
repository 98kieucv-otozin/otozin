'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: 'https://media.otozin.vn/slides/slide1.jpg',
    title: 'Tìm Xe Ưng Ý',
    subtitle: 'Hơn 100,000 xe đa dạng từ xe mới đến xe cũ chất lượng cao',
    description: 'Kết nối người mua và người bán với nền tảng uy tín hàng đầu Việt Nam.',
    buttonText: 'Tìm xe ngay',
    buttonLink: '/search'
  },
  {
    id: 2,
    image: 'https://media.otozin.vn/slide2.jpg',
    title: 'Bán Xe Dễ Dàng',
    subtitle: 'Đăng bán xe nhanh chóng, tiếp cận hàng triệu khách hàng',
    description: 'Hỗ trợ định giá, chụp ảnh và tư vấn bán xe chuyên nghiệp.',
    buttonText: 'Đăng bán xe',
    buttonLink: '/sell-car'
  },
  {
    id: 3,
    image: 'https://media.otozin.vn/slide3.jpg',
    title: 'Cập Nhật Liên Tục',
    subtitle: 'Thông tin xe được cập nhật 24/7, luôn mới nhất và chính xác',
    description: 'Hàng trăm xe mới mỗi ngày, giá cả hợp lý, khuyến mại ngập tràn.',
    buttonText: 'Xem xe mới nhất',
    buttonLink: '/latest-cars'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen max-h-[550px] overflow-hidden" suppressHydrationWarning>
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={`slide-${slide.id}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Content */}
            <div className="relative z-20 flex items-center justify-center h-full">
              <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl md:text-6xl font-bold mb-1">
                  {slide.title}
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-200">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                  {slide.description}
                </p>
                {/* Search bar */}

                {/* Feature blocks */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full  mx-auto">
                  {/* New Cars */}
                  <Link href="/new-cars" className="flex-1 rounded-full aspect-square p-5 flex flex-col items-center shadow-lg transition-transform cursor-pointer relative overflow-hidden h-[120px] md:h-[180px] bg-[#ff9933] group">
                    <div className="absolute inset-0 bg-white opacity-100 z-10"></div>
                    <div className="absolute inset-4 z-20">
                      <Image
                        src="https://media.otozin.vn/new-car.webp"
                        alt="New Cars"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="absolute bottom-2 text-[#FD5E32] font-normal text-lg z-30">Xe Mới</span>
                    <Image
                      src="https://media.otozin.vn/new.png"
                      alt="New Logo"
                      width={40}
                      height={40}
                      className="absolute top-2 left-1/2 transform -translate-x-1/2 z-40"
                    />
                  </Link>
                  {/* Electric Cars */}
                  <Link href="/electric-cars" className="flex-1 rounded-full aspect-square p-5 flex flex-col items-center shadow-lg transition-transform cursor-pointer relative overflow-hidden h-[120px] md:h-[180px] bg-[#ff9933] group">
                    <div className="absolute inset-0 bg-white opacity-100 z-10"></div>
                    <div className="absolute inset-4 z-20">
                      <Image
                        src="https://media.otozin.vn/electric.webp"
                        alt="Electric Cars"
                        fill
                        className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="absolute bottom-2 text-[#FD5E32] font-normal text-lg z-30">Xe Điện</span>
                  </Link>
                  {/* Used Cars */}
                  <Link href="/used-cars" className="flex-1 rounded-full aspect-square p-5 flex flex-col items-center shadow-lg transition-transform cursor-pointer relative overflow-hidden h-[120px] md:h-[180px] bg-[#ff9933] group">
                    <div className="absolute inset-0 bg-white opacity-100 z-10"></div>
                    <div className="absolute inset-4 z-20">
                      <Image
                        src="https://media.otozin.vn/like-new-car.webp"
                        alt="Like New Cars"
                        fill
                        className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="absolute bottom-2 text-[#FD5E32] font-normal text-lg z-30">Xe Lướt</span>

                  </Link>
                  {/* Old Cars */}
                  <Link href="/old-cars" className="flex-1 rounded-full aspect-square p-5 flex flex-col items-center shadow-lg transition-transform cursor-pointer relative overflow-hidden h-[120px] md:h-[180px] bg-[#ff9933] group">
                    <div className="absolute inset-0 bg-white opacity-100 z-10"></div>
                    <div className="absolute inset-4 z-20">
                      <Image
                        src="https://media.otozin.vn/old-car.webp"
                        alt="Old Cars"
                        fill
                        className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="absolute bottom-2 text-[#FD5E32] font-normal text-lg z-30">Xe Cũ</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-white transition-all duration-1000 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
} 