import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RMQError, RMQService } from 'nestjs-rmq';
import { UserGetInfo } from 'src/contracts';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { User } from 'src/guards/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Get()
  async getUserInfo(@User() { id }): Promise<UserGetInfo.Response> {
    try {
      return await this.rmqService.send<
        UserGetInfo.Request,
        UserGetInfo.Response
      >(UserGetInfo.topic, { id });
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

  @UseGuards(JWTAuthGuard)
  @Put()
  updatUserInfo(@User() { id }) {
    return id;
  }

  @UseGuards(JWTAuthGuard)
  @Get('avatar')
  getUserAvatar(@User() { id }) {
    return id;
  }

  @UseGuards(JWTAuthGuard)
  @Post('avatar')
  setUserAvatar(@User() { id }) {
    return id;
  }
}
