export namespace GenerateRefreshPasswordLinkEmployee {
  export const topic = 'employee.generaterefreshpasswordlink.command';

  export class Request {
    email: string;
    new_password: string;
  }

  export class Response {
    success: boolean;
  }
}
