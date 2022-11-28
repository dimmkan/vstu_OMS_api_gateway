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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RMQError, RMQService } from 'nestjs-rmq';
import {
  EmployeeGetAvatar,
  EmployeeGetInfo,
  EmployeeUpdateInfo,
  EmployeeSetAvatar,
  EmployeeDeleteAvatar,
  ValidateEmployeeEmail,
  GenerateRefreshPasswordLinkEmployee,
  ConfirmRefreshPasswordLinkEmployee,
} from 'src/contracts';
import { IGenerateRefreshPasswordLinkEmployeeDto } from 'src/contracts/employee/dto/generateRefreshPasswordLinkEmployee.dto';
import { IUpdateEmployeeDto } from 'src/contracts/employee/dto/updateEmployee.dto';
import { IValidateEmployeeEmailDto } from 'src/contracts/employee/dto/validateEmployeeEmail.dto';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { User } from 'src/guards/user.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Get()
  async getEmployeeInfo(@User() { id }): Promise<EmployeeGetInfo.Response> {
    try {
      return await this.rmqService.send<
        EmployeeGetInfo.Request,
        EmployeeGetInfo.Response
      >(EmployeeGetInfo.topic, { id });
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
  async updatEmployeeInfo(
    @User() { id },
    @Body() dto: IUpdateEmployeeDto,
  ): Promise<EmployeeUpdateInfo.Response> {
    try {
      return await this.rmqService.send<
        EmployeeUpdateInfo.Request,
        EmployeeUpdateInfo.Response
      >(EmployeeUpdateInfo.topic, { id, user_profile: dto });
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
  async getEmployeeAvatar(@User() { id }): Promise<EmployeeGetAvatar.Response> {
    try {
      return await this.rmqService.send<
        EmployeeGetAvatar.Request,
        EmployeeGetAvatar.Response
      >(EmployeeGetAvatar.topic, { id });
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
  async setEmployeeAvatar(
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
  ): Promise<EmployeeSetAvatar.Response> {
    try {
      return await this.rmqService.send<
        EmployeeSetAvatar.Request,
        EmployeeSetAvatar.Response
      >(EmployeeSetAvatar.topic, {
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
  async deleteEmployeeAvatar(
    @User() { id },
  ): Promise<EmployeeDeleteAvatar.Response> {
    try {
      return await this.rmqService.send<
        EmployeeDeleteAvatar.Request,
        EmployeeDeleteAvatar.Response
      >(EmployeeDeleteAvatar.topic, { id });
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

  @Post('validate-email')
  async validateEmployeeEmail(
    @Body() dto: IValidateEmployeeEmailDto,
  ): Promise<ValidateEmployeeEmail.Response> {
    try {
      return await this.rmqService.send<
        ValidateEmployeeEmail.Request,
        ValidateEmployeeEmail.Response
      >(ValidateEmployeeEmail.topic, dto);
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

  @Post('generate-refresh-link')
  async generateRefreshPasswordLink(
    @Body() dto: IGenerateRefreshPasswordLinkEmployeeDto,
  ): Promise<GenerateRefreshPasswordLinkEmployee.Response> {
    try {
      return await this.rmqService.send<
        GenerateRefreshPasswordLinkEmployee.Request,
        GenerateRefreshPasswordLinkEmployee.Response
      >(GenerateRefreshPasswordLinkEmployee.topic, dto);
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

  @Get('confirm-refresh-link')
  async confirm(@Query('hash') code: string) {
    try {
      return await this.rmqService.send<
        ConfirmRefreshPasswordLinkEmployee.Request,
        ConfirmRefreshPasswordLinkEmployee.Response
      >(ConfirmRefreshPasswordLinkEmployee.topic, { hash: code });
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
