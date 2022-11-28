export namespace ConfirmRefreshPasswordLinkEmployee {
  export const topic = 'employee.confirmrefreshpasswordlink.command';

  export class Request {
    hash: string;
  }

  export class Response {
    success: boolean;
  }
}
