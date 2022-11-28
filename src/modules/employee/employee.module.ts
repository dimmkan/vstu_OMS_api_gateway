import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/stratagies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [EmployeeController],
  providers: [JwtStrategy],
})
export class EmployeeModule {}
