import { IsString, IsNotEmpty } from 'class-validator';

export namespace DeleteOrder {
  export const topic = 'order.delete.command';

  export class Request {
    @IsString()
    @IsNotEmpty()
    order_id: string;
  }

  export class Response {
    success: boolean;
  }
}
