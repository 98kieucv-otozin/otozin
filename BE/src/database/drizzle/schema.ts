import { pgTable, serial, varchar, text, boolean, timestamp, integer, decimal, jsonb, pgEnum, uuid, index, uniqueIndex } from 'drizzle-orm/pg-core';

// Enums
export const carConditionEnum = pgEnum('car_condition', ['new', 'like_new', 'used', 'zin']);
export const carSaleStatusEnum = pgEnum('car_sale_status', ['draft', 'active', 'sold', 'pending', 'expired', 'deleted']);

// Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    role: varchar('role', { length: 20 }).notNull().default('USER'),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
}, (table) => ({
    emailIdx: index('idx_users_email').on(table.email),
    deletedAtIdx: index('idx_users_deleted_at').on(table.deletedAt),
}));

// Posts table
export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    author: varchar('author', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
}, (table) => ({
    deletedAtIdx: index('idx_posts_deleted_at').on(table.deletedAt),
}));

// Brands table
export const brands = pgTable('brands', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 150 }).notNull(),
    link: varchar('link', { length: 180 }).notNull(),
    description: text('description'),
    image: varchar('image', { length: 255 }),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
}, (table) => ({
    nameUnique: uniqueIndex('uq_brands_name').on(table.name),
    linkUnique: uniqueIndex('uq_brands_link').on(table.link),
    deletedAtIdx: index('idx_brands_deleted_at').on(table.deletedAt),
}));

// Models table
export const models = pgTable('models', {
    id: uuid('id').primaryKey(),
    brandId: integer('brand_id').notNull().references(() => brands.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 100 }).notNull(),
    bodyType: varchar('body_type', { length: 50 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
}, (table) => ({
    brandIdIdx: index('idx_models_brand_id').on(table.brandId),
    deletedAtIdx: index('idx_models_deleted_at').on(table.deletedAt),
}));

// Model Years table - Match với SQL schema (01-init.sql lines 124-176)
export const modelYears = pgTable('model_years', {
    id: uuid('id').primaryKey(),
    modelId: uuid('model_id').notNull().references(() => models.id, { onDelete: 'cascade' }),
    year: integer('year').notNull(),
    title: varchar('title', { length: 255 }),
    fuel: varchar('fuel', { length: 50 }),
    engine: varchar('engine', { length: 100 }),
    motor: varchar('motor', { length: 100 }),
    transmission: varchar('transmission', { length: 50 }),
    drive: varchar('drive', { length: 50 }),
    powerHp: integer('power_hp'),
    bodyType: varchar('body_type', { length: 50 }),
    seats: integer('seats'),
    fuelConsumptionL100km: decimal('fuel_consumption_l_100km', { precision: 5, scale: 2 }),
    rangeKm: integer('range_km'),
    whPerKm: integer('wh_per_km'),
    topSpeedKmh: integer('top_speed_kmh'),
    acceleration0100: decimal('acceleration_0_100', { precision: 4, scale: 2 }),
    lengthMm: integer('length_mm'),
    widthMm: integer('width_mm'),
    heightMm: integer('height_mm'),
    wheelbaseMm: integer('wheelbase_mm'),
    weightKg: integer('weight_kg'),
    groundClearanceMm: integer('ground_clearance_mm'),
    rimType: varchar('rim_type', { length: 100 }),
    tireSize: varchar('tire_size', { length: 50 }),
    trunkVolumeL: integer('trunk_volume_l'),
    airbags: integer('airbags'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
}, (table) => ({
    modelIdIdx: index('idx_model_years_model_id').on(table.modelId),
    yearIdx: index('idx_model_years_year').on(table.year),
    deletedAtIdx: index('idx_model_years_deleted_at').on(table.deletedAt),
}));

// Trims table - Match với SQL schema (01-init.sql lines 192-243)
export const trims = pgTable('trims', {
    id: uuid('id').primaryKey(),
    modelYearId: uuid('model_year_id').notNull().references(() => modelYears.id, { onDelete: 'cascade' }),
    trimName: varchar('trim_name', { length: 100 }).notNull(),
    fullName: varchar('full_name', { length: 255 }),
    title: varchar('title', { length: 255 }),
    fuel: varchar('fuel', { length: 50 }).notNull(),
    engine: varchar('engine', { length: 100 }),
    motor: varchar('motor', { length: 100 }),
    transmission: varchar('transmission', { length: 50 }),
    drive: varchar('drive', { length: 50 }).notNull(),
    powerHp: integer('power_hp'),
    bodyType: varchar('body_type', { length: 50 }),
    seats: integer('seats'),
    fuelConsumptionL100km: decimal('fuel_consumption_l_100km', { precision: 5, scale: 2 }),
    rangeKm: integer('range_km'),
    whPerKm: integer('wh_per_km'),
    topSpeedKmh: integer('top_speed_kmh'),
    acceleration0100: decimal('acceleration_0_100', { precision: 4, scale: 2 }),
    lengthMm: integer('length_mm'),
    widthMm: integer('width_mm'),
    heightMm: integer('height_mm'),
    wheelbaseMm: integer('wheelbase_mm'),
    weightKg: integer('weight_kg'),
    groundClearanceMm: integer('ground_clearance_mm'),
    rimType: varchar('rim_type', { length: 100 }),
    tireSize: varchar('tire_size', { length: 50 }),
    trunkVolumeL: integer('trunk_volume_l'),
    airbags: integer('airbags'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
}, (table) => ({
    modelYearIdIdx: index('idx_trims_model_year_id').on(table.modelYearId),
    fuelIdx: index('idx_trims_fuel').on(table.fuel),
    deletedAtIdx: index('idx_trims_deleted_at').on(table.deletedAt),
}));

// Cars for Sale table
export const carsForSale = pgTable('cars_for_sale', {
    id: serial('id').primaryKey(),
    sellerId: integer('seller_id').notNull().references(() => users.id),
    modelYearId: uuid('model_year_id').notNull().references(() => modelYears.id),
    trimId: uuid('trim_id').references(() => trims.id), // Optional: có thể không có trim cụ thể
    fuel: varchar('fuel', { length: 50 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    price: decimal('price', { precision: 15, scale: 2 }).notNull(),
    condition: carConditionEnum('condition').notNull().default('new'),
    status: carSaleStatusEnum('status').notNull().default('draft'),
    odo: integer('odo'),
    year: integer('year'),
    color: varchar('color', { length: 50 }),
    vin: varchar('vin', { length: 17 }),
    licensePlate: varchar('license_plate', { length: 20 }),
    province: varchar('province', { length: 100 }),
    images: jsonb('images'),
    thumbnail: varchar('thumbnail', { length: 255 }), // URL của ảnh thumbnail
    features: jsonb('features'),
    accidentHistory: jsonb('accident_history'),
    serviceHistory: jsonb('service_history'),
    ownershipHistory: jsonb('ownership_history'),
    inspectionReport: jsonb('inspection_report'),
    contactPhone: varchar('contact_phone', { length: 20 }),
    contactEmail: varchar('contact_email', { length: 255 }),
    viewCount: integer('view_count').default(0),
    favoriteCount: integer('favorite_count').default(0),
    isFeatured: boolean('is_featured').default(false),
    featuredUntil: timestamp('featured_until'),
    expiresAt: timestamp('expires_at'),
    soldAt: timestamp('sold_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
}, (table) => ({
    sellerIdIdx: index('idx_cars_for_sale_seller_id').on(table.sellerId),
    trimIdIdx: index('idx_cars_for_sale_trim_id').on(table.trimId),
    statusIdx: index('idx_cars_for_sale_status').on(table.status),
    fuelIdx: index('idx_cars_for_sale_fuel').on(table.fuel),
    priceIdx: index('idx_cars_for_sale_price').on(table.price),
    yearIdx: index('idx_cars_for_sale_year').on(table.year),
    provinceIdx: index('idx_cars_for_sale_province').on(table.province),
    createdAtIdx: index('idx_cars_for_sale_created_at').on(table.createdAt),
    isFeaturedIdx: index('idx_cars_for_sale_is_featured').on(table.isFeatured),
    deletedAtIdx: index('idx_cars_for_sale_deleted_at').on(table.deletedAt),
}));
