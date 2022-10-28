export namespace UserUpdateInfo {
  export const topic = 'user.updateinfo.query';

  export class Request {
    id: number;
  }

  export class Response {
    avatar_id: string;
  }
}
