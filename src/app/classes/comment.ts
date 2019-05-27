import { User } from './user';

export class Comment {
  constructor(public id: number,
              public entityId: number,
              public deepth: number,
              public parentCommentId: number,
              public title: string,
              public text: string,
              public userId: User) {}
}
