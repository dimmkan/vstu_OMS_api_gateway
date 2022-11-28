export namespace ValidateEmployeeEmail {
  export const topic = 'employee.validateemail.command';

  export class Request {
    email: string;
  }

  export class Response {
    validate: boolean;
  }
}
