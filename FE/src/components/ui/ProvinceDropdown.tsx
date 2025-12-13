'use client';
import { useState, useRef, useEffect } from 'react';
import { PROVINCES, Province } from '../../constants/provinces';
import { REGIONS } from '../../constants/regions';
import { LocationDotIcon } from '@/components/icons';

interface ProvinceDropdownProps {
    selectedProvince?: string;
    onProvinceChange?: (province: string) => void;
}

export default function ProvinceDropdown({
    selectedProvince = 'HN',
    onProvinceChange
}: ProvinceDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(selectedProvince);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedProvinceData = PROVINCES.find((p: Province) => p.code === selected) || REGIONS.find((r: any) => r.code === selected);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        } 0

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (code: string) => {
        setSelected(code);
        setIsOpen(false);
        onProvinceChange?.(code);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#FD5E32] hover:text-[#FF2400] transition-colors duration-200 border border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <LocationDotIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{selectedProvinceData?.name || 'Chọn tỉnh'}</span>
                <span className="sm:hidden">{selectedProvinceData?.code || 'Tỉnh'}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-sm shadow-lg z-50 max-h-80 overflow-y-auto">
                    <div className="py-1">
                        {/* Region Options */}
                        {REGIONS.map((region) => (
                            <button
                                key={region.code}
                                onClick={() => handleSelect(region.code)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 font-semibold cursor-pointer ${selected === region.code ? 'bg-[#FD5E32] text-white' : 'text-gray-800'
                                    }`}
                            >
                                {region.name}
                            </button>
                        ))}

                        {/* Separator */}
                        <div className="border-t border-gray-200 my-1"></div>

                        {/* Province Options */}
                        {PROVINCES.map((province: Province) => (
                            <button
                                key={province.code}
                                onClick={() => handleSelect(province.code)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer ${selected === province.code ? 'bg-[#FD5E32] text-white' : 'text-gray-700'
                                    }`}
                            >
                                {province.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
