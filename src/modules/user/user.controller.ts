import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RMQError, RMQService } from 'nestjs-rmq';
import { UserGetInfo, UserUpdateInfo } from 'src/contracts';
import { IUpdateUserDto } from 'src/contracts/user/dto/updateUser.dto';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { User } from 'src/guards/user.decorator';

@ApiTags('user')
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
  async updatUserInfo(
    @User() { id },
    @Body() dto: IUpdateUserDto,
  ): Promise<UserUpdateInfo.Response> {
    try {
      return await this.rmqService.send<
        UserUpdateInfo.Request,
        UserUpdateInfo.Response
      >(UserUpdateInfo.topic, { id, user_profile: dto });
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
