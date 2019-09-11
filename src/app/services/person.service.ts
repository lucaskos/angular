import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Person} from '../classes/person';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PersonService {
  personUrl = environment.baseUrl + 'person';
  people: Observable<Person[]>;

  constructor(private httpClient: HttpClient) { }

  getPeople(): Observable<Person[]> {
    this.people = this.httpClient.get<Person[]>(this.personUrl, httpOptions);
    if (this.people != null) {
      this.people.subscribe(res => console.log(res));
    }
    return this.httpClient.get<Person[]>(this.personUrl, httpOptions);
  }

  getPerson(id: number): Observable<Person> {
    console.log('number : ' + id);
    const url = `${this.personUrl}/${id}`;
    return this.httpClient.get<Person>(url, httpOptions);
  }

  savePerson(): any {

  }

  deletePerson(person: Person) {

}

  findByNameAndSurname(name: String): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.personUrl + '/name/' + name, httpOptions);
  }

}
