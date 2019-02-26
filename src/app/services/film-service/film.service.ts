import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from '../../classes/film';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable()
export class FilmService {
  films: Observable<Film[]>;
  film: Film;
  observable: Observable<Film>;
  newFilms: Film[] = [];
  filmUrl = environment.baseUrl + 'film/';

  constructor(private http: HttpClient) {
  }

  getFilms(): Observable<Film[]> {
    console.log( 'getFilms() service' );
    return this.http.get<Film[]>( this.filmUrl + 'list', httpOptions );
  }

  /** GET film by id */
  getFilm(id: number): Observable<Film> {
    const url = `${this.filmUrl}film/${id}`;
    // this.film = this.http.get<Film>(url, httpOptions);
    return this.http.get<Film>( url, httpOptions );
    // .subscribe( (film: Film) => {
    //   this.film = film;
    //   console.log( 'film: ' + film.title );
    // } );


    // Todo: send the message _after_ fetching the film
    // this.observable = this.http.get<Film>( url, httpOptions );

    // this.observable.subscribe( film => this.film = film );

    // return this.film;
    // return of(FILMS.find(film => film.filmId === id));
  }

  saveFilm(film: Film): any {
    // console.log(film);
    // return null;
    if (film.filmId) {
      return this.http.put<Film>( this.filmUrl + film.filmId, film, httpOptions ).subscribe(
        data => console.log( data ),
        error2 => {
          console.log( error2 );
        }
      );
    } else {
      return this.http.put<Film>( this.filmUrl + 'add', film, httpOptions ).subscribe(
        data => console.log( data ),
        error2 => {
          console.log( error2 );
        }
      );
    }
  }

  private extractData(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error( 'Bad response status: ' + response.status );
    }
    const body = response.json(); // parse JSON string into JavaScript objects

    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure before returning/sending the error
    const errMsg = error.message || 'Server error'; // transform the error into a user-friendly message

    return Observable.throw( errMsg ); // returns the message in a new, failed observable
  }

}

