export namespace EmployeeGetAvatar {
  export const topic = 'employee.getavatar.query';

  export class Request {
    id: number;
  }

  export class Response {
    avatar_id: string;
  }
}
