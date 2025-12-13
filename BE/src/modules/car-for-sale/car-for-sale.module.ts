import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from '../../database/drizzle/drizzle.module';
import { SearchModule } from '../search/search.module';
import { CarModelModule } from '../car-model/car-model.module';
import { CarForSaleController } from './car-for-sale.controller';
import { CarForSaleService } from './car-for-sale.service';
import { CarForSaleRepository } from './car-for-sale.repository';

@Module({
    imports: [
        DrizzleModule,
        ConfigModule,
        SearchModule, // Import để dùng TypesenseSyncService
        CarModelModule, // Import để dùng CarModelService
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get('jwt.accessTokenExpiresIn'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [CarForSaleController],
    providers: [CarForSaleService, CarForSaleRepository],
    exports: [CarForSaleService, CarForSaleRepository],
})
export class CarForSaleModule { }

