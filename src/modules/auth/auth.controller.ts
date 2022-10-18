import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
  Param,
  Get,
} from '@nestjs/common';
import { get } from 'http';
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

  @Get('register/confirm/:code')
  async confirm(@Param('code') code: string) {
    try {
      return await this.rmqService.send<
        AuthConfirm.Request,
        AuthConfirm.Response
      >(AuthConfirm.topic, { confirm_code: code });
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
