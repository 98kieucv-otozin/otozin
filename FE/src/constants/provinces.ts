export interface Province {
    id: number;
    code: string;
    name: string;
    region: string;
}

export const PROVINCES: Province[] = [
    // Miền Bắc
    { id: 1, code: 'HN', name: 'TP Hà Nội', region: 'MIEN_BAC' },
    { id: 2, code: 'HCM', name: 'TP Hồ Chí Minh', region: 'MIEN_NAM' },
    { id: 3, code: 'HP', name: 'Hải Phòng', region: 'MIEN_BAC' },
    { id: 4, code: 'ĐN', name: 'Đà Nẵng', region: 'MIEN_TRUNG' },
    { id: 5, code: 'HU', name: 'Huế', region: 'MIEN_TRUNG' },
    { id: 31, code: 'TH', name: 'Thanh Hoá', region: 'MIEN_BAC' },
    { id: 7, code: 'TQ', name: 'Tuyên Quang', region: 'MIEN_BAC' },
    { id: 8, code: 'LC', name: 'Lào Cai', region: 'MIEN_BAC' },
    { id: 9, code: 'TNG', name: 'Thái Nguyên', region: 'MIEN_BAC' },
    { id: 10, code: 'PT', name: 'Phú Thọ', region: 'MIEN_BAC' },
    { id: 11, code: 'BN', name: 'Bắc Ninh', region: 'MIEN_BAC' },
    { id: 12, code: 'HY', name: 'Hưng Yên', region: 'MIEN_BAC' },
    { id: 13, code: 'NB', name: 'Ninh Bình', region: 'MIEN_BAC' },
    { id: 26, code: 'LC2', name: 'Lai Châu', region: 'MIEN_BAC' },
    { id: 27, code: 'ĐB', name: 'Điện Biên', region: 'MIEN_BAC' },
    { id: 28, code: 'SL', name: 'Sơn La', region: 'MIEN_BAC' },
    { id: 29, code: 'LS', name: 'Lạng Sơn', region: 'MIEN_BAC' },
    { id: 30, code: 'QN', name: 'Quảng Ninh', region: 'MIEN_BAC' },

    { id: 32, code: 'NA', name: 'Nghệ An', region: 'MIEN_BAC' },
    { id: 33, code: 'HT', name: 'Hà Tĩnh', region: 'MIEN_BAC' },
    { id: 34, code: 'CB', name: 'Cao Bằng', region: 'MIEN_BAC' },

    // Miền Trung

    { id: 14, code: 'QT', name: 'Quảng Trị', region: 'MIEN_TRUNG' },
    { id: 15, code: 'QG', name: 'Quảng Ngãi', region: 'MIEN_TRUNG' },
    { id: 16, code: 'GL', name: 'Gia Lai', region: 'MIEN_TRUNG' },
    { id: 17, code: 'KH', name: 'Khánh Hoà', region: 'MIEN_TRUNG' },
    { id: 18, code: 'LD', name: 'Lâm Đồng', region: 'MIEN_TRUNG' },
    { id: 19, code: 'DL', name: 'Đắk Lắk', region: 'MIEN_TRUNG' },

    // Miền Nam
    { id: 6, code: 'CT', name: 'Cần Thơ', region: 'MIEN_NAM' },
    { id: 20, code: 'DN', name: 'Đồng Nai', region: 'MIEN_NAM' },
    { id: 21, code: 'TN', name: 'Tây Ninh', region: 'MIEN_NAM' },
    { id: 22, code: 'VL', name: 'Vĩnh Long', region: 'MIEN_NAM' },
    { id: 23, code: 'ĐT', name: 'Đồng Tháp', region: 'MIEN_NAM' },
    { id: 24, code: 'CM', name: 'Cà Mau', region: 'MIEN_NAM' },
    { id: 25, code: 'AG', name: 'An Giang', region: 'MIEN_NAM' },
];