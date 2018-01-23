import { Film } from './../film';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../services/film-service/film.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
// name here must correspond to the name in the html
// if the name in the top file is different it doesn't matter
  @Input() film: Film;
  title = new FormControl;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    this.getFilm();
  }

  getFilm(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == null || id === 0) {
      console.log('Wrong id value!');
    } else {
    this.filmService.getFilm(id)
      .subscribe(film => this.film = film);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.filmService.saveFilm(this.film).subscribe(() => this.goBack());
  }

}
