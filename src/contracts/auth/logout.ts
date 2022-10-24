export namespace AuthLogout {
  export const topic = 'auth.logout.command';

  export class Request {
    id: number;
    rId: number;
  }

  export class Response {
    success: boolean;
  }
}
