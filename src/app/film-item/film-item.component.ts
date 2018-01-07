import { Film } from './../film';
import { Component, OnInit } from '@angular/core';
import {FilmService} from '../services/film-service/film.service';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
  providers: [FilmService]
})
export class FilmItemComponent implements OnInit {
  test = 'List of films';
  films: Film[];
  filmDetail: Film;

  constructor(private filmservice: FilmService) {

  }

  ngOnInit() {
    this.getFilms();
    this.filmDetail = undefined;
  }

  getFilms(): void {
    this.filmservice.getFilms()
      .subscribe(film => this.films = film);
  }

  onSelect(film: Film): void {
    if (this.filmDetail === film) {
      this.filmDetail = undefined;
    } else {
      this.filmDetail = film;
    }
  }

  loadFilmToEdit(film: Film): void {
    console.log(film);
    this.filmDetail = film;
  }
}
