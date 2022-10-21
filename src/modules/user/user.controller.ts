import { Controller, Get, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { User } from 'src/guards/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Get('info')
  info(@User() { id }) {
    return id;
  }
}
