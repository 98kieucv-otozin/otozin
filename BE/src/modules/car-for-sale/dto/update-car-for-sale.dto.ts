import { PartialType } from '@nestjs/mapped-types';
import { CreateCarForSaleDto } from './create-car-for-sale.dto';

export class UpdateCarForSaleDto extends PartialType(CreateCarForSaleDto) {}

