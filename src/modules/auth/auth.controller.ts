import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
  Param,
  Get,
  BadRequestException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RMQError, RMQService } from 'nestjs-rmq';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { User } from 'src/guards/user.decorator';
import { ILoginUser } from 'src/interfaces/loginUser.interface';
import { IRefreshToken } from 'src/interfaces/refreshToken.interface';
import { AuthLogin, AuthLogout, AuthRefresh } from '../../contracts';
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
      if (error instanceof RMQError) {
        if (error.code && error.code === 400) {
          throw new BadRequestException(error.message);
        }
      }

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
      if (error instanceof RMQError) {
        if (error.code && error.code === 400) {
          throw new BadRequestException(error.message);
        }
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Post('login')
  async login(
    @Body() dto: ILoginUser,
    @Request() req,
  ): Promise<AuthLogin.Response> {
    const request = {
      ...dto,
      ip: req.headers['host'],
      agent: req.headers['user-agent'],
    };

    try {
      return await this.rmqService.send<AuthLogin.Request, AuthLogin.Response>(
        AuthLogin.topic,
        request,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @UseGuards(JWTAuthGuard)
  @Post('refresh')
  async refresh(
    @User() dto: IRefreshToken,
    @Request() req,
  ): Promise<AuthRefresh.Response> {
    const request = {
      ...dto,
      ip: req.headers['host'],
      agent: req.headers['user-agent'],
    };

    try {
      return await this.rmqService.send<
        AuthRefresh.Request,
        AuthRefresh.Response
      >(AuthRefresh.topic, request);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @UseGuards(JWTAuthGuard)
  @Post('logout')
  async logout(@User() dto: AuthLogout.Request): Promise<AuthLogout.Response> {
    try {
      return await this.rmqService.send<
        AuthLogout.Request,
        AuthLogout.Response
      >(AuthLogout.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
