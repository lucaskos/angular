import { Film } from '../../../classes/film';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FilmService } from '../../../services/film-service/film.service';
import { Person } from '../../../classes/person';
import { PersonService } from '../../../services/person-service/person.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html'
} )
export class FilmCreateComponent implements OnInit {
  filmForm: FormGroup;
  newFilm: string;
  titleLength = 2;
  @Input() film: Film;
  id: number;
  @Output() notifyOfSavedCompletted = new EventEmitter();
  isLoaded;

  deletedPeople: Person[] = new Array();
  peopleToAdd: FormGroup;

  found: Person[];

  options: String[] = [ 'ACTOR', 'DIRECTOR', 'MUSICIAN', 'WRITER' ];

  roleValue: String;

  constructor(private filmService: FilmService,
              private personService: PersonService,
              private router: Router) {

    this.createForm();

  }

  filmUpdatedSuccessfully(edited: boolean) {
    this.notifyOfSavedCompletted.emit( edited );
  }

  ngOnInit(): void {
    if (this.film) {
      this.filmForm = new FormGroup( {
        'title': new FormControl( this.film.title, [
          Validators.required,
          Validators.minLength( this.titleLength )
        ] ),
        'year': new FormControl( this.film.year ),
        'description': new FormControl( this.film.description )
        ,
        'peopleList': new FormArray( this.getPeopleControlls( this.film.peopleList ) )
      } );
    }
  }

  onEditCancel() {
    this.filmUpdatedSuccessfully(true);
  }

  createForm() {
    this.filmForm = new FormGroup( {
      'title': new FormControl( null, [
        Validators.required,
        Validators.minLength( this.titleLength )
      ] ),
      'year': new FormControl( null ),
      'description': new FormControl( null )
    } );

    this.peopleToAdd = new FormGroup( {
        'people': new FormArray( [] )
      }
    );
  }

  onSubmit() {
    if (this.filmForm.valid) {
      if (!this.film) {
        this.film = new Film( null,
          this.filmForm.get( 'title' ).value,
          this.filmForm.get( 'year' ).value,
          this.filmForm.get( 'description' ).value,
          null );
      } else {
        this.film.title = this.filmForm.get( 'title' ).value;
        this.film.description = this.filmForm.get( 'description' ).value;
        this.film.year = this.filmForm.get( 'year' ).value;
      }
      this.filmService.saveFilm( this.film ).map( res => {
        return res;
      } ).subscribe( data => {
        this.isLoaded = true;
        this.film = data;
        this.filmUpdatedSuccessfully(true);
        this.router.navigate( [ 'films/', this.film.filmId ] );
      } );

    }
  }

  resetForm() {
    this.createForm();
  }

  onAddActor() {
    // this.filmForm.addControl('person', new FormControl(null));

    // (<FormArray>this.peopleToAdd.get('people')).push( new FormControl( null ) );
  }

  getPeopleControlls(people: Array<Person>): Array<FormControl> | any {
    const peopleArray: Array<FormControl> = new Array();
    for (const index in people) {
      peopleArray.push( new FormControl( people[ index ].firstName || ' ' || people[ index ].lastName ) );
    }
    return peopleArray;
  }

  onRemoveActor(id: number) {
    if (this.film.peopleList.length > 0) {
      this.film.peopleList.map(
        (person: Person) => {
          if (+person.id === id && id > 0) {

            const personIndex = this.film.peopleList.indexOf( person );

            this.deletedPeople.push( person );

            this.film.peopleList.splice( personIndex, 1 );
          }
        }
      );
    }
  }

  onFindPerson(input: FormControl) {
    const name = input.value.trim();
    if (name !== '' && name.length > 3) {
      const people = this.personService.findByNameAndSurname( name );

      console.log( people );

      people.subscribe(
        (persons: Person[]) => this.found = persons,
        (error) => console.log( 'error: ' + error )
      );
      console.log( this.found );
    }
  }

  onAddPerson(person: Person, role: String) {
    console.log( role );
    if (this.film.peopleList.indexOf( person ) === -1) {
      this.film.peopleList.push( person );

      ( <FormArray>this.filmForm.get( 'peopleList' )).push( new FormControl( this.film.peopleList.lastIndexOf( person ) ) );
    }
    console.log( person );
    console.log( this.roleValue );
  }

  onchange(person: Person, $event) {
    person.role = $event.toString();
    console.log( person );
  }
}
