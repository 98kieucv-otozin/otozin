import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from '../../database/drizzle/drizzle.module';
import { TypesenseSyncService } from './typesense-sync.service';
import { SyncDbService } from './sync-db.service';
import { SearchController } from './search.controller';

@Module({
  imports: [
    ConfigModule,
    DrizzleModule,
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
  controllers: [SearchController],
  providers: [TypesenseSyncService, SyncDbService],
  exports: [TypesenseSyncService, SyncDbService],
})
export class SearchModule { }
