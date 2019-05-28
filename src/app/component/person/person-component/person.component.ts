import { Component, OnInit } from '@angular/core';
import {Person} from '../../../classes/person';
import {PersonService} from '../../../services/person-service/person.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  collection: Observable<Person[]>;
  people: Person[];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPeople();
  }

  getPeople(): void {
    console.log('getPeoples');
    this.collection = this.personService.getPeople();
    console.log('Collection : ');
    console.log(this.collection);
    this.personService.getPeople()
      .subscribe( person => this.people = person);
  }

}
