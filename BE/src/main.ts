import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoggingInterceptor, TransformInterceptor, PerformanceInterceptor } from './shared/interceptors';
import { HttpExceptionFilter } from './shared/filters';
import { CustomValidationPipe } from './shared/pipes';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      logger: process.env.NODE_ENV === 'development',
      bodyLimit: 1048576, // 1MB
      maxParamLength: 100,
    }),
  );

  // Register cookie plugin
  await app.register(fastifyCookie);

  const configService = app.get(ConfigService);
  
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for better performance
  }));

  // Enable CORS with explicit origin allow-list
  const corsConfig = configService.get('cors') as {
    allowedOrigins: string[];
    credentials: boolean;
  };
  const allowedOrigins = corsConfig?.allowedOrigins ?? [];
  const allowAllOrigins = allowedOrigins.includes('*');

  app.enableCors({
    origin: (origin, callback) => {
      if (allowAllOrigins || !origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: corsConfig?.credentials ?? true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global validation pipe
  app.useGlobalPipes(new CustomValidationPipe());

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(configService),
    new TransformInterceptor(),
    new PerformanceInterceptor(),
  );

  const port = configService.get('port') || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
