import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/stratagies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [JwtStrategy],
})
export class UserModule {}
