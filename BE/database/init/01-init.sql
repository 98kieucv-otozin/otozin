-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Create index for email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON users(deleted_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Create trigger for posts table
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create index for posts deleted_at
CREATE INDEX IF NOT EXISTS idx_posts_deleted_at ON posts(deleted_at);

-- Update users table to add role
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'USER';

-- Insert sample data
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
    ('admin@example.com', '$2b$10$example_hash', 'Admin', 'User', 'ADMIN'),
    ('user@example.com', '$2b$10$example_hash', 'Regular', 'User', 'USER'),
    ('dealer@example.com', '$2b$10$example_hash', 'Dealer', 'User', 'DEALER'),
    ('cs@example.com', '$2b$10$example_hash', 'CS', 'User', 'CUSTOMER_SERVICE')
ON CONFLICT (email) DO NOTHING; 

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    link VARCHAR(180) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Unique indexes for brands
CREATE UNIQUE INDEX IF NOT EXISTS uq_brands_name ON brands(name);
CREATE UNIQUE INDEX IF NOT EXISTS uq_brands_link ON brands(link);
CREATE INDEX IF NOT EXISTS idx_brands_deleted_at ON brands(deleted_at);

-- Create trigger for brands table
CREATE TRIGGER update_brands_updated_at 
    BEFORE UPDATE ON brands 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create enum type for model status if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'model_status') THEN
        CREATE TYPE model_status AS ENUM ('active', 'discontinued');
    END IF;
END$$;

-- Create models table
CREATE TABLE IF NOT EXISTS models (
    id UUID PRIMARY KEY,
    brand_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    body_type VARCHAR(50),                   -- Hatchback, Sedan, SUV, Crossover, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Indexes and constraints for models
CREATE INDEX IF NOT EXISTS idx_models_brand_id ON models(brand_id);
CREATE UNIQUE INDEX IF NOT EXISTS uq_models_brand_name ON models(brand_id, name);
CREATE UNIQUE INDEX IF NOT EXISTS uq_models_brand_slug ON models(brand_id, slug);
CREATE INDEX IF NOT EXISTS idx_models_deleted_at ON models(deleted_at);

-- Create trigger for models table
CREATE TRIGGER update_models_updated_at 
    BEFORE UPDATE ON models 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create model_years table
-- Giữ các field cơ bản + một bộ thông số kỹ thuật ở mức model_year
-- (dùng trong trường hợp không có trims, hoặc làm default cho trims)
CREATE TABLE IF NOT EXISTS model_years (
    id UUID PRIMARY KEY,
    model_id UUID NOT NULL,
    year INT NOT NULL,

    -- Tiêu đề (dùng cho trường hợp không có trims, hoặc hiển thị tổng quan theo năm)
    title VARCHAR(255),

    -- Nhiên liệu
    fuel VARCHAR(50),                        -- gasoline, diesel, electric, hybrid

    -- Động cơ & truyền động
    engine VARCHAR(100),
    motor VARCHAR(100),
    transmission VARCHAR(50),
    drive VARCHAR(50),
    power_hp INT,

    -- Thông số kỹ thuật
    body_type VARCHAR(50),
    seats INT,

    -- Nhiên liệu & Pin
    fuel_consumption_l_100km DECIMAL(5,2),
    battery_capacity_kWh DECIMAL(6,2),
    range_km INT,
    wh_per_km INT,

    -- Hiệu suất
    torque_Nm INT,
    top_speed_kmh INT,
    acceleration_0_100 DECIMAL(4,2),

    -- Kích thước & Trọng lượng
    length_mm INT,
    width_mm INT,
    height_mm INT,
    wheelbase_mm INT,
    weight_kg INT,
    ground_clearance_mm INT,

    -- Lốp & Mâm
    rim_type VARCHAR(100),
    tire_size VARCHAR(50),

    -- Khác
    trunk_volume_l INT,
    airbags INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Indexes and constraints for model_years
CREATE INDEX IF NOT EXISTS idx_model_years_model_id ON model_years(model_id);
CREATE INDEX IF NOT EXISTS idx_model_years_year ON model_years(year);
CREATE UNIQUE INDEX IF NOT EXISTS uq_model_years_model_year ON model_years(model_id, year);
CREATE INDEX IF NOT EXISTS idx_model_years_deleted_at ON model_years(deleted_at);

-- Create trigger for model_years table
CREATE TRIGGER update_model_years_updated_at 
    BEFORE UPDATE ON model_years 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create trims table
-- Tất cả thông số chi tiết từ JSON đều nằm trong bảng này
CREATE TABLE IF NOT EXISTS trims (
    id UUID PRIMARY KEY,
    model_year_id UUID NOT NULL,
    trim_name VARCHAR(100) NOT NULL,        -- name trong JSON
    full_name VARCHAR(255),                  -- full_name trong JSON
    title VARCHAR(255),                      -- title trong JSON (dùng cho search)
    
    -- Nhiên liệu
    fuel VARCHAR(50) NOT NULL,              -- gasoline, diesel, electric, hybrid (loại nhiên liệu của trim, ví dụ xe điện chắc chắn là electric)
    
    -- Động cơ & truyền động
    engine VARCHAR(100),                     -- engine trong JSON (xe xăng)
    motor VARCHAR(100),                      -- motor trong JSON (xe điện)
    transmission VARCHAR(50),                -- transmission trong JSON
    drive VARCHAR(50) NOT NULL,               -- drive trong JSON (FWD, RWD, AWD)
    power_hp INT,                            -- power_hp trong JSON
    
    -- Thông số kỹ thuật
    body_type VARCHAR(50),                   -- body_type (có thể khác nhau giữa các trim)
    seats INT,                                -- seats trong JSON
    
    -- Nhiên liệu & Pin
    fuel_consumption_l_100km DECIMAL(5,2),   -- fuel_consumption_l_100km trong JSON
    battery_capacity_kWh DECIMAL(6,2),       -- battery_capacity_kWh trong JSON (xe điện)
    range_km INT,                            -- range_km trong JSON (xe điện)
    wh_per_km INT,                           -- wh_per_km trong JSON (xe điện)
    
    -- Hiệu suất
    torque_Nm INT,                           -- torque_Nm trong JSON
    top_speed_kmh INT,                       -- top_speed_kmh trong JSON
    acceleration_0_100 DECIMAL(4,2),         -- acceleration_0_100 trong JSON
    
    -- Kích thước & Trọng lượng
    length_mm INT,                           -- length_mm trong JSON
    width_mm INT,                            -- width_mm trong JSON
    height_mm INT,                           -- height_mm trong JSON
    wheelbase_mm INT,                        -- wheelbase_mm trong JSON
    weight_kg INT,                           -- weight_kg trong JSON
    ground_clearance_mm INT,                 -- ground_clearance_mm trong JSON
    
    -- Lốp & Mâm
    rim_type VARCHAR(100),                   -- rim_type trong JSON
    tire_size VARCHAR(50),                   -- tire_size trong JSON
    
    -- Khác
    trunk_volume_l INT,                      -- trunk_volume_l trong JSON
    airbags INT,                             -- airbags trong JSON
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Indexes and constraints for trims
CREATE INDEX IF NOT EXISTS idx_trims_model_year_id ON trims(model_year_id);
CREATE INDEX IF NOT EXISTS idx_trims_fuel ON trims(fuel);
CREATE UNIQUE INDEX IF NOT EXISTS uq_trims_model_year_trim_name ON trims(model_year_id, trim_name);
CREATE INDEX IF NOT EXISTS idx_trims_deleted_at ON trims(deleted_at);

-- Create trigger for trims table
CREATE TRIGGER update_trims_updated_at 
    BEFORE UPDATE ON trims 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create enum type for car condition if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'car_condition') THEN
        CREATE TYPE car_condition AS ENUM ('new', 'like_new', 'used', 'zin');
    END IF;
END$$;

-- Create enum type for car status if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'car_sale_status') THEN
        CREATE TYPE car_sale_status AS ENUM ('draft', 'active', 'sold', 'pending', 'expired', 'deleted');
    END IF;
END$$;

-- Create cars_for_sale table
CREATE TABLE IF NOT EXISTS cars_for_sale (
    id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL,
    model_year_id UUID NOT NULL,
    trim_id UUID ,
    fuel VARCHAR(50) NOT NULL,              -- gasoline, diesel, electric, hybrid (loại nhiên liệu của từng xe cụ thể)
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    condition car_condition NOT NULL DEFAULT 'new',
    status car_sale_status NOT NULL DEFAULT 'draft',
    odo INT,                              -- số km đã đi
    year INT,                                 -- năm sản xuất
    color VARCHAR(50),
    vin VARCHAR(17),                         -- số khung
    license_plate VARCHAR(20),
    province VARCHAR(100),                    -- tỉnh/thành phố                 -- quận/huyện
    images JSONB,
    thumbnail VARCHAR(255),                            -- danh sách ảnh
    features JSONB,                          -- tính năng bổ sung
    accident_history JSONB,                  -- lịch sử tai nạn
    service_history JSONB,                   -- lịch sử bảo dưỡng
    ownership_history JSONB,                 -- lịch sử chủ sở hữu
    inspection_report JSONB,                 -- báo cáo kiểm định
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    view_count INT DEFAULT 0,
    favorite_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    featured_until TIMESTAMP,
    expires_at TIMESTAMP,
    sold_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Indexes and constraints for cars_for_sale
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_seller_id ON cars_for_sale(seller_id);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_trim_id ON cars_for_sale(trim_id);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_status ON cars_for_sale(status);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_fuel ON cars_for_sale(fuel);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_price ON cars_for_sale(price);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_year ON cars_for_sale(year);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_province ON cars_for_sale(province);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_created_at ON cars_for_sale(created_at);
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_is_featured ON cars_for_sale(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_cars_for_sale_deleted_at ON cars_for_sale(deleted_at);

-- Create trigger for cars_for_sale table
CREATE TRIGGER update_cars_for_sale_updated_at 
    BEFORE UPDATE ON cars_for_sale 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();