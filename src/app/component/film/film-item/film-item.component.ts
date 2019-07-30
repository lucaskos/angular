import { Observable } from 'rxjs/Observable';
import { Film } from '../../../classes/film';
import { Component, OnInit } from '@angular/core';
import {FilmService} from '../../../services/film-service/film.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
  providers: [FilmService]
})
export class FilmItemComponent implements OnInit {
  films: Film[];
  filmDetail: Film;
  collection: Observable<Film[]>;

  constructor(private filmService: FilmService,
              private router: Router) {

  }

  ngOnInit() {
    this.getFilms();
    this.filmDetail = undefined;
  }

  getFilms(): void {
    this.collection = this.filmService.getFilms();
    this.filmService.getFilms()
      .subscribe(film => this.films = film);
  }

  addNew(): void {
    this.router.navigate(['film/new']);
  }
}
