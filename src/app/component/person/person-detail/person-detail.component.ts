import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../../services/person-service/person.service';
import {Person} from '../../../classes/person';
import { Location } from '@angular/common';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css'],
  providers: [PersonService]
})
export class PersonDetailComponent implements OnInit {
  private person: Person;
  persons: Observable<Person>;

  constructor(    private route: ActivatedRoute,
  private personService: PersonService,
  private location: Location) {

  }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == null || id === 0) {
      console.log('Wrong value');
    } else {
      console.log('getPerson: ' + id);
      this.personService.getPerson(id).subscribe(person => console.log(person));
      this.persons = this.personService.getPerson(id);
      console.log(JSON.stringify(this.persons));
      this.personService.getPerson(id)
        .subscribe(person => this.person = person);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
