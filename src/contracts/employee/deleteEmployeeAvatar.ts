export namespace EmployeeDeleteAvatar {
  export const topic = 'employee.deleteavatar.query';

  export class Request {
    id: number;
  }

  export class Response {
    success: boolean;
  }
}
