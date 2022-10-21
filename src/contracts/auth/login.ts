export namespace AuthLogin {
  export const topic = 'auth.login.command';

  export class Request {
    email: string;
    password: string;
    ip: string;
    agent: string;
  }

  export class Response {
    access_token: string;
  }
}
