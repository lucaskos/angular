import {Person} from './person';
import {Comment} from './comment';

export class Film {

  constructor(public filmId: number,
              public title: string,
              public year: number,
              public description: string,
              public peopleList: Person[],
              public filmCommentsList: Comment[]) {
  }
}
