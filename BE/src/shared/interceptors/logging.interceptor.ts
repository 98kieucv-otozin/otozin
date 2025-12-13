import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const userAgent = request.headers['user-agent'] || '';
    const now = Date.now();

    // Skip logging in production for performance
    const isDevelopment = this.configService.get('nodeEnv') === 'development';
    
    if (isDevelopment) {
      this.logger.log(`${method} ${url} - ${ip} - ${userAgent}`);
    }

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        if (isDevelopment) {
          this.logger.log(`${method} ${url} - ${responseTime}ms`);
        } else {
          // Log only slow requests in production
          if (responseTime > 1000) {
            this.logger.warn(`${method} ${url} - Slow request: ${responseTime}ms`);
          }
        }
      }),
    );
  }
} 