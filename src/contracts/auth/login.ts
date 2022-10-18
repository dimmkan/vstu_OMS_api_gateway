export namespace AuthLogin {
  export const topic = 'auth.login.command';

  export class Request {
    email: string;
    password: string;
  }

  export class Response {
    access_token: string;
  }
}
