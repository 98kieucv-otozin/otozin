import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './database/drizzle/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { CmsPostModule } from './modules/cms-post/cms-post.module';
import { SearchModule } from './modules/search/search.module';
import { CarModelModule } from './modules/car-model/car-model.module';
import { UploadModule } from './modules/upload/upload.module';
import { CarForSaleModule } from './modules/car-for-sale/car-for-sale.module';
import { RoleGuard } from './shared/guards/role.guard';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DrizzleModule,
    AuthModule,
    CmsPostModule,
    SearchModule,
    CarModelModule,
    UploadModule,
    CarForSaleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule { }
