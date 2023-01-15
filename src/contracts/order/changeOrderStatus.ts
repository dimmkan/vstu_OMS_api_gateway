import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

const statuses = ['accepted', 'inprogress', 'finished'] as const;
export type Statuses = typeof statuses[number];

export namespace ChangeOrderStatus {
  export const topic = 'order.changestatus.command';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    order_id: string;

    @IsIn(statuses)
    status: Statuses;
  }

  export class Response {
    success: boolean;
  }
}
