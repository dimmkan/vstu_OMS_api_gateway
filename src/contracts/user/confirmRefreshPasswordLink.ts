export namespace ConfirmRefreshPasswordLink {
  export const topic = 'user.confirmrefreshpasswordlink.command';

  export class Request {
    hash: string;
  }

  export class Response {
    success: boolean;
  }
}
