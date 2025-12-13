import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly code?: string,
  ) {
    super(
      {
        message,
        code,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}

export class DatabaseException extends CustomException {
  constructor(message: string = 'Database operation failed') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, 'DATABASE_ERROR');
  }
}

export class ValidationException extends CustomException {
  constructor(message: string = 'Validation failed') {
    super(message, HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR');
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND, 'NOT_FOUND');
  }
} 