export namespace UserSetAvatar {
  export const topic = 'user.setavatar.query';

  export class Request {
    id: number;
    avatar: string;
    filename: string;
  }

  export class Response {
    avatar_id: string;
  }
}
