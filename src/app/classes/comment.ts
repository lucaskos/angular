import { User } from './user';

export class Comment {
  constructor(public id: number,
              public entityId: number,
              public entityType: string,
              public depth: number,
              public parentCommentId: number,
              public title: string,
              public text: string,
              public userId: User) {}
}
