import { ApiResponse } from '../../common/interfaces';

export class ResponseUtil {
  static success<T>(data: T, message: string = 'Success'): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, code?: string, errors?: any[]): ApiResponse<null> {
    return {
      success: false,
      data: null,
      message,
      code,
      errors,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message: string = 'Success',
  ) {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
} 