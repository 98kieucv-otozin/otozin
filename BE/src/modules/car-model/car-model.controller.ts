import { Controller, Get, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CarModelService } from './car-model.service';

@Controller('car-models')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) { }
  /**
   * Lấy thông tin xe theo model_year_id + trim_id
   * GET /car-models/detail?model_year_id=...&trim_id=...
   */
  @Get('detail/by-model-year-and-trim')
  @HttpCode(HttpStatus.OK)
  async getCarDetailByModelYearAndTrim(
    @Query('model_year_id') modelYearId: string,
    @Query('trim_id') trimId: string,
  ) {
    const data = await this.carModelService.getCarDetailByModelYearAndTrim(
      modelYearId,
      trimId,
    );
    return {
      success: true,
      data,
    };
  }
}


