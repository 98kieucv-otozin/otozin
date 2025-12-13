import { Module, Global, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DRIZZLE_DB = 'DRIZZLE_DB';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        const pool = new Pool({
          connectionString: dbConfig.url,
          max: dbConfig.pool.maximumPoolSize,
          min: dbConfig.pool.minimumPoolSize,
          idleTimeoutMillis: dbConfig.pool.idleTimeout,
          connectionTimeoutMillis: dbConfig.pool.connectionTimeout,
        });

        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DrizzleModule implements OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {}

  async onModuleDestroy() {
    // Pool sẽ tự động đóng khi module destroy
  }
}

