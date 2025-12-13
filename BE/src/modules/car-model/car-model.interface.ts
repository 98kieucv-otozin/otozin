export interface CarModel {
  id: string; // UUID
  brand_id: number;
  name: string;
  slug: string;
  body_type: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CarDetail {
  // brand
  brand_id: number;
  brand_name: string;
  brand_link: string;

  // model
  model_id: string;
  model_name: string;
  model_slug: string;
  model_body_type: string | null;

  // model year
  model_year_id: string;
  year: number;

  // trim
  trim_id: string;
  trim_name: string;
  full_name: string | null;
  title: string | null;
  fuel: string;
  engine: string | null;
  motor: string | null;
  transmission: string | null;
  drive: string;
  power_hp: number | null;
  body_type: string | null;
  seats: number | null;
  fuel_consumption_l_100km: string | null;
  battery_capacity_kWh: string | null;
  range_km: number | null;
  wh_per_km: number | null;
  torque_Nm: number | null;
  top_speed_kmh: number | null;
  acceleration_0_100: string | null;
  length_mm: number | null;
  width_mm: number | null;
  height_mm: number | null;
  wheelbase_mm: number | null;
  weight_kg: number | null;
  ground_clearance_mm: number | null;
  rim_type: string | null;
  tire_size: string | null;
  trunk_volume_l: number | null;
  airbags: number | null;
}


