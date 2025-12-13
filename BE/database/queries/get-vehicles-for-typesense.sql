-- Query to get vehicle model identification data from model_years with optional trims
-- Mục đích: Tìm ra đúng model xe chính xác (brand, model, year, trim nếu có, engine...)
-- Hỗ trợ cả xe có trim và xe không có trim (chỉ có model_year)
-- Không bao gồm giá - giá chỉ dùng cho search khách hàng
-- This query is optimized for Typesense indexing

SELECT DISTINCT
    -- Primary ID (nối để đảm bảo unique, không cần filter theo field này)
    -- Format: "trim_123" nếu có trim, "my_10" nếu không có trim (my = model_year)
    CASE 
        WHEN t.id IS NOT NULL THEN CONCAT('trim_', t.id::TEXT)
        ELSE CONCAT('my_', my.id::TEXT)
    END AS id,
    
    -- Brand (Nhà sản xuất)
    b.id AS brand_id,
    b.name AS brand_name,
    b.link AS brand_slug,
    
    -- Model
    m.id AS model_id,
    m.name AS model_name,
    m.slug AS model_slug,
    m.segment,  -- Phân khúc: Sedan, SUV, Hatchback...
    m.body_type,  -- Loại thân xe
    m.description AS model_description,  -- Mô tả model
    
    -- Year (Năm sản xuất)
    my.id AS model_year_id,
    my.year AS year,
    my.generation,  -- Thế hệ: "Gen 8", "Thế hệ 2024"...
    my.seating_capacity,  -- Số chỗ ngồi: 5, 7...
    
    -- Trim version (Phiên bản: base, luxury, etc.) - NULL nếu không có trim
    t.id AS trim_id,
    t.trim_name,
    t.grade,  -- base, luxury, sport, etc.
    
    -- Engine information (Thông tin động cơ)
    -- Ưu tiên engine từ trim, fallback về model_year
    COALESCE(t.engine, my.engine_type) AS engine,
    COALESCE(t.transmission, my.transmission) AS transmission,
    COALESCE(t.fuel_type, my.fuel_type) AS fuel_type,
    COALESCE(t.drive_type, my.drive_type) AS drive_type

FROM model_years my
INNER JOIN models m ON my.model_id = m.id
INNER JOIN brands b ON m.brand_id = b.id
LEFT JOIN trims t ON 
    t.model_year_id = my.id 
    AND t.deleted_at IS NULL
    -- Đảm bảo lấy tất cả trims (kể cả available = false nếu cần)
    -- Có thể thêm: AND t.available = true nếu chỉ muốn lấy trims available

WHERE 
    -- Filter out soft-deleted records
    my.deleted_at IS NULL
    AND m.deleted_at IS NULL
    AND b.deleted_at IS NULL
    -- Only active brands
    AND b.is_active = true
    -- Only active models (optional, depending on your business logic)
    AND m.status = 'active'

ORDER BY 
    b.name ASC,
    m.name ASC,
    my.year DESC,
    COALESCE(t.trim_name, '') ASC;

