import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export namespace ChangeOrderDescription {
  export const topic = 'order.changedescription.command';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    order_id: string;

    @IsString()
    @IsNotEmpty()
    description: string;
  }

  export class Response {
    success: boolean;
  }
}
