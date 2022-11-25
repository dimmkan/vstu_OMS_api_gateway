export namespace AuthLoginEmployee {
  export const topic = 'auth.loginemployee.command';

  export class Request {
    email: string;
    password: string;
    ip: string;
    agent: string;
  }

  export class Response {
    access_token: string;
    refresh_token: string;
  }
}
