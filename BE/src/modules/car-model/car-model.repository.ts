import { Inject, Injectable } from '@nestjs/common';
import { eq, and, isNull } from 'drizzle-orm';
import { DRIZZLE_DB } from '../../database/drizzle/drizzle.module';
import { brands, models, modelYears, trims } from '../../database/drizzle/schema';
import { CarDetail } from './car-model.interface';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class CarModelRepository {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: NodePgDatabase,
  ) { }

  async getCarDetailByModelYear(modelYearId: string): Promise<CarDetail | null> {
    const [row] = await this.db
      .select({
        brandId: brands.id,
        brandName: brands.name,
        brandLink: brands.link,
        modelId: models.id,
        modelName: models.name,
        modelSlug: models.slug,
        modelBodyType: models.bodyType,
        modelYearId: modelYears.id,
        year: modelYears.year,
        title: modelYears.title,
        fuel: modelYears.fuel,
        engine: modelYears.engine,
        motor: modelYears.motor,
        transmission: modelYears.transmission,
        drive: modelYears.drive,
        powerHp: modelYears.powerHp,
        bodyType: modelYears.bodyType,
        seats: modelYears.seats,
        fuelConsumptionL100km: modelYears.fuelConsumptionL100km,
        rangeKm: modelYears.rangeKm,
        whPerKm: modelYears.whPerKm,
        topSpeedKmh: modelYears.topSpeedKmh,
        acceleration0100: modelYears.acceleration0100,
        lengthMm: modelYears.lengthMm,
        widthMm: modelYears.widthMm,
        heightMm: modelYears.heightMm,
        wheelbaseMm: modelYears.wheelbaseMm,
        weightKg: modelYears.weightKg,
        groundClearanceMm: modelYears.groundClearanceMm,
        rimType: modelYears.rimType,
        tireSize: modelYears.tireSize,
        trunkVolumeL: modelYears.trunkVolumeL,
        airbags: modelYears.airbags,
      })
      .from(modelYears)
      .innerJoin(models, and(eq(models.id, modelYears.modelId), isNull(models.deletedAt)))
      .innerJoin(brands, and(eq(brands.id, models.brandId), isNull(brands.deletedAt)))
      .where(and(eq(modelYears.id, modelYearId), isNull(modelYears.deletedAt)))
      .limit(1);

    if (!row) return null;
    return row as unknown as CarDetail;
  }

  async getCarDetailByTrim(trimId: string): Promise<CarDetail | null> {
    const [row] = await this.db
      .select({
        brandId: brands.id,
        brandName: brands.name,
        brandLink: brands.link,
        modelId: models.id,
        modelName: models.name,
        modelSlug: models.slug,
        modelBodyType: models.bodyType,
        modelYearId: modelYears.id,
        year: modelYears.year,
        trimId: trims.id,
        trimName: trims.trimName,
        fullName: trims.fullName,
        title: trims.title,
        fuel: trims.fuel,
        engine: trims.engine,
        motor: trims.motor,
        transmission: trims.transmission,
        drive: trims.drive,
        powerHp: trims.powerHp,
        bodyType: trims.bodyType,
        seats: trims.seats,
        fuelConsumptionL100km: trims.fuelConsumptionL100km,
        rangeKm: trims.rangeKm,
        whPerKm: trims.whPerKm,
        topSpeedKmh: trims.topSpeedKmh,
        acceleration0100: trims.acceleration0100,
        lengthMm: trims.lengthMm,
        widthMm: trims.widthMm,
        heightMm: trims.heightMm,
        wheelbaseMm: trims.wheelbaseMm,
        weightKg: trims.weightKg,
        groundClearanceMm: trims.groundClearanceMm,
        rimType: trims.rimType,
        tireSize: trims.tireSize,
        trunkVolumeL: trims.trunkVolumeL,
        airbags: trims.airbags,
      })
      .from(trims)
      .innerJoin(modelYears, and(eq(modelYears.id, trims.modelYearId), isNull(modelYears.deletedAt)))
      .innerJoin(models, and(eq(models.id, modelYears.modelId), isNull(models.deletedAt)))
      .innerJoin(brands, and(eq(brands.id, models.brandId), isNull(brands.deletedAt)))
      .where(and(eq(trims.id, trimId), isNull(trims.deletedAt)))
      .limit(1);

    if (!row) return null;
    return row as unknown as CarDetail;
  }
}
