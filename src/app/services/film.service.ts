import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from '../classes/film';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class FilmService {
  films: Observable<Film[]>;
  film: Film;
  filmUrl = environment.baseUrl + 'film/';

  constructor(private http: HttpClient) {
  }

  getAllFilms(): Observable<Film[]> {
    return this.http.get<Film[]>( this.filmUrl + 'list' );
  }

  getFilm(id: number): Observable<Film> {
    const url = `${this.filmUrl}${id}`;
    return this.http.get<Film>( url );
  }

  getByTitle(title: string): Observable<Film[]> {
    return this.http.get<Film[]>( `${this.filmUrl}${title}` );
  }

  saveFilm(film: Film): Observable<Film> {
    if (film.filmId) {
      return this.http.put<Film>( this.filmUrl, film );
    } else {
      return this.http.post<Film>( this.filmUrl + 'add', film );
    }

  }

  delete(film: Film): Observable<{}> {
    return this.http.delete( this.filmUrl + film.filmId );
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

