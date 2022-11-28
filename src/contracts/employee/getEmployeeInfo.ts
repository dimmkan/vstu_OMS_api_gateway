export namespace EmployeeGetInfo {
  export const topic = 'employee.getinfo.query';

  export class Request {
    id: number;
  }

  export class Response {
    id: number;
    email: string;
    confirmed: boolean;
    employee_profile: {
      id: number;
      full_name: string;
      sex: string;
      birthday: string;
      specify: string;
    };
  }
}
