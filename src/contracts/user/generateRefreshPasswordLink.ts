export namespace GenerateRefreshPasswordLink {
  export const topic = 'user.generaterefreshpasswordlink.command';

  export class Request {
    email: string;
    new_password: string;
  }

  export class Response {
    success: boolean;
  }
}
