import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CarDetail } from './car-model.interface';
import { CarModelRepository } from './car-model.repository';

@Injectable()
export class CarModelService {
  constructor(
    private readonly carModelRepository: CarModelRepository,
  ) { }
  /**
   * Lấy thông tin xe đầy đủ theo model_year_id + trim_id
   */
  async getCarDetailByModelYearAndTrim(
    modelYearId: string,
    trimId: string | null,
  ): Promise<CarDetail> {
    if (!modelYearId && !trimId) {
      throw new BadRequestException('model_year_id or trim_id is required');
    }

    // Ưu tiên trim_id nếu truyền vào, vì trim xác định cấu hình xe cụ thể
    if (trimId) {
      const byTrim = await this.carModelRepository.getCarDetailByTrim(trimId);
      if (!byTrim) {
        throw new NotFoundException('Car not found');
      }
      return byTrim;
    }

    // Nếu không có trim_id, lấy theo model_year_id (lấy 1 trim đại diện)
    const byModelYear = await this.carModelRepository.getCarDetailByModelYear(
      modelYearId,
    );
    if (!byModelYear) {
      throw new NotFoundException('Car not found');
    }
    return byModelYear;
  }
}


