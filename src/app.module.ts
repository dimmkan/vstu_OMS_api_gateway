import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from './configs/jwt.config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './modules/user/user.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { OrderModule } from './modules/order/order.module';
import { OrderController } from './modules/order/order.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    JwtModule.registerAsync(getJWTConfig()),
    RMQModule.forRootAsync(getRMQConfig()),
    PassportModule,
    UserModule,
    EmployeeModule,
    OrderModule,
  ],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
