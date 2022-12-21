import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { ChangeOrderStatus, CreateOrder } from 'src/contracts';
import { ICreateOrderDto } from 'src/contracts/order/dto/createOrder.dto';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { User } from 'src/guards/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async createOrder(
    @Body() dto: ICreateOrderDto,
    @User() { id },
  ): Promise<CreateOrder.Response> {
    try {
      return await this.rmqService.send<
        CreateOrder.Request,
        CreateOrder.Response
      >(CreateOrder.topic, { user_id: id, ...dto });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @UseGuards(JWTAuthGuard)
  @Post('change-status')
  @UsePipes(new ValidationPipe())
  async changeOrderStatus(
    @Body() dto: ChangeOrderStatus.Request,
  ): Promise<ChangeOrderStatus.Response> {
    try {
      return await this.rmqService.send<
        ChangeOrderStatus.Request,
        ChangeOrderStatus.Response
      >(ChangeOrderStatus.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
