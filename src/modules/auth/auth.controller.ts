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
import { ApiTags } from '@nestjs/swagger';
import { RMQError, RMQService } from 'nestjs-rmq';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { User } from 'src/guards/user.decorator';
import { ILoginUser } from 'src/interfaces/loginUser.interface';
import { IRefreshToken } from 'src/interfaces/refreshToken.interface';
import {
  AuthRegister,
  AuthRegisterEmployee,
  AuthLogin,
  AuthLogout,
  AuthRefresh,
  AuthConfirm,
  AuthConfirmEmployee,
  AuthLoginEmployee,
  AuthRefreshEmployee,
  AuthLogoutEmployee,
} from '../../contracts';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  //User part
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

  //Employee part
  @Post('employee/register')
  async registerEmployee(@Body() dto: AuthRegisterEmployee.Request) {
    try {
      return await this.rmqService.send<
        AuthRegisterEmployee.Request,
        AuthRegisterEmployee.Response
      >(AuthRegisterEmployee.topic, dto);
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

  @Get('employee/register/confirm/:code')
  async confirmEmployee(@Param('code') code: string) {
    try {
      return await this.rmqService.send<
        AuthConfirmEmployee.Request,
        AuthConfirmEmployee.Response
      >(AuthConfirmEmployee.topic, { confirm_code: code });
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

  @Post('employee/login')
  async loginEmployee(
    @Body() dto: ILoginUser,
    @Request() req,
  ): Promise<AuthLoginEmployee.Response> {
    const request = {
      ...dto,
      ip: req.headers['host'],
      agent: req.headers['user-agent'],
    };

    try {
      return await this.rmqService.send<
        AuthLoginEmployee.Request,
        AuthLoginEmployee.Response
      >(AuthLoginEmployee.topic, request);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @UseGuards(JWTAuthGuard)
  @Post('employee/refresh')
  async refreshEmployee(
    @User() dto: IRefreshToken,
    @Request() req,
  ): Promise<AuthRefreshEmployee.Response> {
    const request = {
      ...dto,
      ip: req.headers['host'],
      agent: req.headers['user-agent'],
    };

    try {
      return await this.rmqService.send<
        AuthRefreshEmployee.Request,
        AuthRefreshEmployee.Response
      >(AuthRefreshEmployee.topic, request);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @UseGuards(JWTAuthGuard)
  @Post('employee/logout')
  async logoutEmployee(
    @User() dto: AuthLogoutEmployee.Request,
  ): Promise<AuthLogoutEmployee.Response> {
    try {
      return await this.rmqService.send<
        AuthLogoutEmployee.Request,
        AuthLogoutEmployee.Response
      >(AuthLogoutEmployee.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
