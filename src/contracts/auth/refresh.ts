export namespace AuthRefresh {
  export const topic = 'auth.refresh.command';

  export class Request {
    id: number;
    key: string;
    ip: string;
    agent: string;
  }

  export class Response {
    access_token: string;
    refresh_token: string;
  }
}
