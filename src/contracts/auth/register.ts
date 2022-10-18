export namespace AuthRegister {
  export const topic = 'auth.register.command';

  export class Request {
    email: string;
    password: string;
    fullName: string;
  }

  export class Response {
    success: boolean;
  }
}
