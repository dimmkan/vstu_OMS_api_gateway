export namespace EmployeeUpdateInfo {
  export const topic = 'employee.updateinfo.query';

  export class Request {
    id: number;
    user_profile: {
      full_name: string;
      sex: string;
      birthday: string;
      specify: string;
    };
  }

  export class Response {
    success: boolean;
  }
}
