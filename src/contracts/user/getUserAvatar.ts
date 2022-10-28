export namespace UserGetAvatar {
  export const topic = 'user.getavatar.query';

  export class Request {
    id: number;
  }

  export class Response {
    avatar_id: string;
  }
}
