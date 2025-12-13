'use client';
import { useState } from 'react';
import { LocationDotIcon } from '@/components/icons';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMake, setSelectedMake] = useState('All');
    const [selectedModel, setSelectedModel] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');

    const makes = ['All', 'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia', 'Mazda'];
    const models = ['All', 'Camry', 'Civic', 'Focus', 'X3', 'C-Class', 'A4', 'Elantra', 'Sportage', 'CX-5'];
    const prices = ['All', 'Under $10k', '$10k - $20k', '$20k - $30k', '$30k - $50k', 'Over $50k'];
    const years = ['All', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];

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
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* Search Input */}
                    <div className="flex-1 w-full lg:w-auto">
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
                                placeholder="Search here (196,051 cars in stock)"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap gap-3">
                        {/* Make Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedMake}
                                onChange={(e) => setSelectedMake(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
                            >
                                {makes.map((make) => (
                                    <option key={make} value={make}>{make}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Model Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
                            >
                                {models.map((model) => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Price Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
                            >
                                {prices.map((price) => (
                                    <option key={price} value={price}>{price}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Year Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {/* More Filters Button */}
                        <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                            </svg>
                            More filters
                        </button>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
