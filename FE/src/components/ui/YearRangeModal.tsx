'use client';
import { useState, useRef, useEffect } from 'react';

interface YearRangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectYearRange: (fromYear: string, toYear: string) => void;
    selectedYearRange?: string;
}

export default function YearRangeModal({ isOpen, onClose, onSelectYearRange, selectedYearRange }: YearRangeModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');

    // Generate years from current year to 20 years back
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let i = 0; i <= 20; i++) {
        years.push((currentYear - i).toString());
    }

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

    const handleApply = () => {
        if (fromYear && toYear) {
            const yearRange = `${fromYear} - ${toYear}`;
            onSelectYearRange(yearRange, yearRange);
            onClose();
        }
    };

    const handleReset = () => {
        setFromYear('');
        setToYear('');
        onSelectYearRange('Tất cả', 'Tất cả');
        onClose();
    };

    // Filter years based on selection
    const getToYearOptions = () => {
        if (!fromYear) return years;
        return years.filter(year => parseInt(year) >= parseInt(fromYear));
    };

    const getFromYearOptions = () => {
        if (!toYear) return years;
        return years.filter(year => parseInt(year) <= parseInt(toYear));
    };

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="absolute left-0 top-full mt-2 w-[95vw] max-w-[400px] bg-white shadow-lg border border-gray-100 rounded-sm px-4 py-4 z-[9999]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold text-gray-800">Chọn năm sản xuất</h3>
                <button
                    onClick={handleReset}
                    className="px-3 py-1 text-xs font-medium text-[#FD5E32] hover:text-[#FF2400] transition-colors duration-200"
                >
                    Reset
                </button>
            </div>

            {/* Year Selection */}
            <div className="space-y-4">
                {/* From Year and To Year on same line */}
                <div className="grid grid-cols-2 gap-4">
                    {/* From Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Từ năm</label>
                        <select
                            value={fromYear}
                            onChange={(e) => {
                                setFromYear(e.target.value);
                                // Reset toYear if it becomes invalid
                                if (toYear && parseInt(e.target.value) > parseInt(toYear)) {
                                    setToYear('');
                                }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Chọn năm</option>
                            {getFromYearOptions().map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    {/* To Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Đến năm</label>
                        <select
                            value={toYear}
                            onChange={(e) => {
                                setToYear(e.target.value);
                                // Reset fromYear if it becomes invalid
                                if (fromYear && parseInt(e.target.value) < parseInt(fromYear)) {
                                    setFromYear('');
                                }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Chọn năm</option>
                            {getToYearOptions().map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Selected Range Display */}
                {fromYear && toYear && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800">
                            <span className="font-medium">Khoảng năm:</span> {fromYear} - {toYear}
                        </p>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                >
                    Hủy
                </button>
                <button
                    onClick={handleApply}
                    disabled={!fromYear || !toYear}
                    className="px-4 py-2 bg-[#FD5E32] text-white text-sm font-medium rounded-sm hover:bg-[#FF2400] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Áp dụng
                </button>
            </div>
        </div>
    );
}
