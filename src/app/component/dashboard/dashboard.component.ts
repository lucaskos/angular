import {Film} from '../../classes/film';
import {Component, OnInit} from '@angular/core';
import {FilmService} from '../../services/film.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    films: Film[] = [];

    constructor(private filmService: FilmService) {
        console.log('dashboard');
    }

    ngOnInit() {
        this.getFilms();
    }

    getFilms(): void {
        this.filmService.getAllFilms()
            .subscribe(films => this.films = films.slice(0, 4));
    }

}
