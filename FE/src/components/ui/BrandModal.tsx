'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { POPULAR_BRANDS, LUXURY_BRANDS } from '@/constants/carBrands';

interface BrandModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectBrand: (brand: string) => void;
    selectedBrand?: string;
}

export default function BrandModal({ isOpen, onClose, onSelectBrand, selectedBrand }: BrandModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleBrandSelect = (brandName: string) => {
        onSelectBrand(brandName);
        onClose();
    };

    const handleReset = () => {
        onSelectBrand('Tất cả');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="absolute left-0 top-full mt-2  w-[95vw] max-w-[600px] bg-white shadow-lg border border-gray-100 rounded-sm px-2 py-2 z-[9999] max-h-[80vh] overflow-y-auto">

            {/* Car Brands Section - Stacked Layout */}
            <div className="mt-4">
                {/* Popular Car Brands */}
                <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 text-center">
                        Hãng Xe Ưa Chuộng
                    </h4>
                    <div className="grid grid-cols-6 gap-1">
                        {POPULAR_BRANDS.map((brand) => (
                            <button
                                key={brand.name}
                                onClick={() => handleBrandSelect(brand.name)}
                                className={`block bg-white dark:bg-gray-800 rounded-sm p-2 shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#FD5E32] cursor-pointer ${selectedBrand === brand.name ? 'border-[#FD5E32] bg-orange-50' : ''
                                    }`}
                            >
                                <div className="flex flex-col items-center">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 object-contain group-hover:scale-130 transition-transform duration-300"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1 text-center">
                                        {brand.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Luxury Car Brands */}
                <div>
                    <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 text-center">
                        Hãng Xe Sang
                    </h4>
                    <div className="grid grid-cols-6 gap-1">
                        {LUXURY_BRANDS.map((brand) => (
                            <button
                                key={brand.name}
                                onClick={() => handleBrandSelect(brand.name)}
                                className={`block bg-white dark:bg-gray-800 rounded-sm p-2 shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#FD5E32] cursor-pointer ${selectedBrand === brand.name ? 'border-[#FD5E32] bg-orange-50' : ''
                                    }`}
                            >
                                <div className="flex flex-col items-center">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 object-contain group-hover:scale-130 transition-transform duration-300"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1 text-center">
                                        {brand.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}