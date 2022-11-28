export namespace EmployeeSetAvatar {
  export const topic = 'employee.setavatar.query';

  export class Request {
    id: number;
    avatar: string;
    filename: string;
  }

  export class Response {
    avatar_id: string;
  }
}
