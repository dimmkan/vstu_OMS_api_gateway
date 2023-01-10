import { IsString, IsNotEmpty } from 'class-validator';

export namespace ChangeOrderDescription {
  export const topic = 'order.changedescription.command';

  export class Request {
    @IsString()
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
