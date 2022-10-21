import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const getJWTConfig = (): JwtModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    verifyOptions: {
      algorithms: ['HS256', 'HS512'],
    },
  }),
});
