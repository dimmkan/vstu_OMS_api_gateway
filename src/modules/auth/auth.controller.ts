import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { AuthLogin } from '../../contracts';
import { AuthRegister } from '../../contracts';
import { AuthConfirm } from '../../contracts';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: AuthRegister.Request) {
    try {
      return await this.rmqService.send<
        AuthRegister.Request,
        AuthRegister.Response
      >(AuthRegister.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Post('register/confirm')
  async confirm(@Body() dto: AuthConfirm.Request) {
    try {
      return await this.rmqService.send<
        AuthConfirm.Request,
        AuthConfirm.Response
      >(AuthConfirm.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: AuthLogin.Request) {
    try {
      return await this.rmqService.send<AuthLogin.Request, AuthLogin.Response>(
        AuthLogin.topic,
        dto,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
