import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  InternalServerErrorException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { RMQError, RMQService } from 'nestjs-rmq';
import {
  UserGetAvatar,
  UserGetInfo,
  UserUpdateInfo,
  UserSetAvatar,
  UserDeleteAvatar,
} from 'src/contracts';
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
  async getUserAvatar(@User() { id }): Promise<UserGetAvatar.Response> {
    try {
      return await this.rmqService.send<
        UserGetAvatar.Request,
        UserGetAvatar.Response
      >(UserGetAvatar.topic, { id });
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
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async setUserAvatar(
    @User() { id },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'jpeg|png' }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<UserSetAvatar.Response> {
    try {
      return await this.rmqService.send<
        UserSetAvatar.Request,
        UserSetAvatar.Response
      >(UserSetAvatar.topic, {
        id,
        avatar: avatar.buffer.toString('base64'),
        filename: avatar.originalname,
      });
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
  @Delete('avatar')
  async deleteUserAvatar(@User() { id }): Promise<UserDeleteAvatar.Response> {
    try {
      return await this.rmqService.send<
        UserDeleteAvatar.Request,
        UserDeleteAvatar.Response
      >(UserDeleteAvatar.topic, { id });
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
}
