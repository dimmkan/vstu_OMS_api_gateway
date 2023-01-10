export namespace GetUserOrders {
  export const topic = 'order.getbyuser.query';

  export class Request {
    user_id: number;
  }

  export class Response {
    data: [];
  }
}
