import { IsNotEmpty, IsNumber } from 'class-validator';

export namespace DeleteOrder {
  export const topic = 'order.delete.command';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    order_id: string;
  }

  export class Response {
    success: boolean;
  }
}
