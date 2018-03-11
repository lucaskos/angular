import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from './../../film';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class FilmService {
  films: Observable<Film[]>;
  film: Observable<Film>;
  newFilms: Film[] = [];
  filmUrl = 'http://localhost:8080/filmdb/film';

  constructor(private http: HttpClient) {
  }

  getFilms(): Observable<Film[]> {
    console.log('getFilms() service');
    return this.http.get<Film[]>(this.filmUrl, httpOptions);
  }

  /** GET film by id */
  getFilm(id: number): Observable<Film> {
    const url = `${this.filmUrl}/${id}`;
    this.film = this.http.get<Film>(url, httpOptions);
    if (this.film != null) {
      this.film.subscribe(res => console.log(res));
    }
    // Todo: send the message _after_ fetching the film
    return this.http.get<Film>(url, httpOptions);
    // return of(FILMS.find(film => film.filmId === id));
  }

  saveFilm(film: Film): Observable<Number> {
    console.log(film);
    return null;
    // return this.http.post<Number>(this.filmUrl, httpOptions);
  }

}

