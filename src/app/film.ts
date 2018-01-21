import { Person } from './person';

export class Film {
    constructor (
        public filmId: number, public title: string, public year: number, public description: string, public peopleList: Person[]
    ) {}
}
