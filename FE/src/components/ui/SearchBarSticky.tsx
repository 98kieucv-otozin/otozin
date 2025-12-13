'use client';
import { useState } from 'react';
import { POPULAR_BRANDS, LUXURY_BRANDS } from '@/constants/carBrands';
import { MEGA_MENU_DATA } from '@/constants/menuData';
import BrandModal from './BrandModal';
import YearRangeModal from './YearRangeModal';

export default function SearchBarSticky() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMake, setSelectedMake] = useState('Tất cả');
    const [selectedModel, setSelectedModel] = useState('Tất cả');
    const [selectedPrice, setSelectedPrice] = useState('Tất cả');
    const [selectedYear, setSelectedYear] = useState('Tất cả');
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
    const [isYearModalOpen, setIsYearModalOpen] = useState(false);

    // Combine all brands from constants
    const allBrands = [
        { name: 'Tất cả', value: 'Tất cả' },
        ...POPULAR_BRANDS.map(brand => ({ name: brand.name, value: brand.name })),
        ...LUXURY_BRANDS.map(brand => ({ name: brand.name, value: brand.name }))
    ];

    const models = ['Tất cả', 'Camry', 'Civic', 'Focus', 'X3', 'C-Class', 'A4', 'Elantra', 'Sportage', 'CX-5'];
    const prices = ['Tất cả', ...MEGA_MENU_DATA.priceRanges];
    const years = ['Tất cả', ...MEGA_MENU_DATA.years];

    const handleSearch = () => {
        console.log('Search:', {
            query: searchQuery,
            make: selectedMake,
            model: selectedModel,
            price: selectedPrice,
            year: selectedYear
        });
    };

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-start">
                    {/* Search Input */}
                    <div className="w-full max-w-[300px]">
                        <label className="block text-sm text-gray-600 mb-1 font-medium">Tìm kiếm</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Xe gì cũng có - tìm ngay!"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                            />
                        </div>
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap gap-3 items-end">
                        {/* Make Dropdown */}
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1 font-medium">Hãng xe</label>
                            <button
                                onClick={() => setIsBrandModalOpen(!isBrandModalOpen)}
                                className="w-full text-left bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px] font-sans hover:border-gray-400 transition-colors cursor-pointer"
                            >
                                {selectedMake}
                            </button>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none top-6">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Brand Modal */}
                            <BrandModal
                                isOpen={isBrandModalOpen}
                                onClose={() => setIsBrandModalOpen(false)}
                                onSelectBrand={setSelectedMake}
                                selectedBrand={selectedMake}
                            />
                        </div>

                        {/* Model Dropdown */}
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1 font-medium">Hiệu xe</label>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px] font-sans"
                            >
                                {models.map((model) => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none top-6">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Price Dropdown */}
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1 font-medium">Giá xe</label>
                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px] font-sans"
                            >
                                {prices.map((price) => (
                                    <option key={price} value={price}>{price}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none top-6">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Year Dropdown */}
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1 font-medium">Năm sản xuất</label>
                            <button
                                onClick={() => setIsYearModalOpen(!isYearModalOpen)}
                                className="w-full text-left bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px] font-sans hover:border-gray-400 transition-colors cursor-pointer"
                            >
                                {selectedYear}
                            </button>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none top-6">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Year Range Modal */}
                            <YearRangeModal
                                isOpen={isYearModalOpen}
                                onClose={() => setIsYearModalOpen(false)}
                                onSelectYearRange={setSelectedYear}
                                selectedYearRange={selectedYear}
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex gap-3">
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1 font-medium opacity-0">Tìm xe</label>
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2 text-white text-sm font-medium rounded-sm focus:outline-none   transition-colors duration-200 font-sans cursor-pointer"
                                style={{ backgroundColor: '#49a2d7' }}
                            >
                                Tìm xe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
