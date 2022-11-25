export namespace AuthConfirmEmployee {
  export const topic = 'auth.confirmemployee.command';

  export class Request {
    confirm_code: string;
  }

  export class Response {
    success: true;
  }
}
