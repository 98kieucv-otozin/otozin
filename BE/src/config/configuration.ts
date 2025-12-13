import { JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_REFRESH_TOKEN_EXPIRES_IN } from '../common/constants';

const DEFAULT_LOCALHOST_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

const parseCorsOrigins = () => {
  const rawOrigins = process.env.CORS_ORIGIN;
  if (!rawOrigins) {
    return DEFAULT_LOCALHOST_ORIGINS;
  }

  const processedOrigins = rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (processedOrigins.includes('*')) {
    return ['*'];
  }

  return processedOrigins;
};

export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt((process.env.PORT || '4000'), 10),
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
    pool: {
      maximumPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10', 10),
      minimumPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '2', 10),
      idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
      connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
    },
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    accessTokenExpiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
  cors: {
    allowedOrigins: parseCorsOrigins(),
    credentials: true,
  },
  fastify: {
    trustProxy: true,
    logger: process.env.NODE_ENV === 'development',
    bodyLimit: 1048576, // 1MB
    maxParamLength: 100,
  },
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucketName: process.env.R2_BUCKET_NAME || '',
    publicUrl: process.env.R2_PUBLIC_URL || '', // Optional: Custom domain cho R2
  },
}); 