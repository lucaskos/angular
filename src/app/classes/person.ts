import {Film} from './film';

export class Person {
  constructor(public id: string,
              public firstName: string,
              public lastName: string,
              public filmList: Film[]) {
  }

}
