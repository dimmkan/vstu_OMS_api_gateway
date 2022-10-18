import { Controller, Post, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { UserId } from 'src/guards/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Post('info')
  async info(@UserId() userId: number) {
    return userId;
  }
}
