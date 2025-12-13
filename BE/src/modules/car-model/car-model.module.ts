import { Module } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CarModelController } from './car-model.controller';
import { DrizzleModule } from '../../database/drizzle/drizzle.module';
import { CarModelRepository } from './car-model.repository';

@Module({
  imports: [DrizzleModule],
  controllers: [CarModelController],
  providers: [CarModelService, CarModelRepository],
  exports: [CarModelService, CarModelRepository],
})
export class CarModelModule {}


