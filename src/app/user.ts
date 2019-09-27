import {Role} from './classes/role';

export class User {
  constructor(public userId: string,
              public firstName: string,
              public lastName: string,
              public email: string,
              public username: string,
              public token: string,
              public roles: Role[]) {
  }

}
