import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/stratagies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [JwtStrategy],
})
export class UserModule {}
