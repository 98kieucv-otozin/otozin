import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Use plainToInstance instead of deprecated plainToClass
    const object = plainToInstance(metatype, value, {
      enableImplicitConversion: true, // Enable automatic type conversion
    });
    
    const errors = await validate(object, {
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: false, // Don't throw error for non-whitelisted properties
      transform: true, // Automatically transform types
    });

    if (errors.length > 0) {
      const errorMessages = errors.map(error => ({
        field: error.property,
        message: Object.values(error.constraints || {}).join(', '),
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        errors: errorMessages,
      });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
} 