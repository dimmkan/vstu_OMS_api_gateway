export namespace ValidateUserEmail {
  export const topic = 'user.validateemail.command';

  export class Request {
    email: string;
  }

  export class Response {
    validate: boolean;
  }
}
