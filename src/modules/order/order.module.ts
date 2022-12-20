import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/stratagies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { OrderController } from './order.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [OrderController],
  providers: [JwtStrategy],
})
export class OrderModule {}
