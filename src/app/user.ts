import {Role} from './classes/role';
import {Roles} from "./classes/roles";

export class User {
    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public email: string,
                public username: string,
                public token: string,
                public roles: Roles[]) {
    }

}
