export const MEGA_MENU_DATA = {
  carMakes: [
    'VinFast', 'Toyota', 'Hyundai', 'Kia', 'Honda', 'Mazda', 'Mitsubishi',
    'Ford', 'Suzuki', 'Nissan', 'Mercedes-Benz', 'BMW', 'Lexus', 'Peugeot',
    'Volkswagen', 'Hãng khác'
  ],
  carBodyTypes: [
    'Sedan', 'SUV', 'Hatchback', 'Van / Minivan', 'Truck', 'Coupe', 'Wagon',
    'Convertible', 'UTE', 'Bus / Minibus', 'Bike', 'Machinery', 'Mini Vehicle', 'Other'
  ],
  priceRanges: [
    '100 – 200 triệu', '200 – 400 triệu', '400 – 600 triệu', '600 – 800 triệu',
    '800 – 1 tỷ', '1 – 1.5 tỷ', '1.5 – 2.5 tỷ', '2.5 – 5 tỷ', 'Trên 5 tỷ'
  ],
  fuelTypes: [
    'Xăng', 'Dầu (Diesel)', 'Điện (EV)', 'Hybrid', 'PHEV'
  ],
  years: (() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= 10; i++) {
      years.push((currentYear - i).toString());
    }
    years.push(`Trước ${currentYear - 10}`);
    return years;
  })(),
  discounts: [
    'Trên 70%', 'Trên 60%', 'Trên 50%', 'Trên 40%', 'Trên 30%', '1% - 30%'
  ]
};

export const MEGA_MENU_COLUMNS = [
  { title: 'HÃNG XE', data: MEGA_MENU_DATA.carMakes },
  { title: 'KIỂU XE', data: MEGA_MENU_DATA.carBodyTypes },
  { title: 'GIÁ XE', data: MEGA_MENU_DATA.priceRanges },
  { title: 'NHIÊN LIỆU', data: MEGA_MENU_DATA.fuelTypes },
  { title: 'NĂM SẢN XUẤT', data: MEGA_MENU_DATA.years },
  { title: 'GIẢM GIÁ', data: MEGA_MENU_DATA.discounts }
]; 