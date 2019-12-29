import {Film} from '../../../classes/film';
import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmService} from '../../../services/film.service';
import {UserService} from '../../../services/user.service';
import {AlertService} from '../../../services/alert-service';
import {catchError, finalize} from 'rxjs/internal/operators';
import {subscribeTo} from 'rxjs/internal/util/subscribeTo';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
    selector: 'app-film-detail',
    templateUrl: './film-detail.component.html',
    styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
    @Output() film: Film;
    toggleEdit = false;
    id: number;

    constructor(private filmService: FilmService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');

        this.filmService.getFilm(this.id).subscribe(
            (film: Film) => {
                this.film = film;
            },
            (error) => this.alertService.error(error)
        );
    }

    deleteFilm() {
        const deleted: Subscription = this.filmService.delete(this.film)
            .subscribe(() => {
                    this.router.navigate(['films/']);
                },
                (error => {
                    this.alertService.error('error', error.toString());
                }));
    }

    loadFilmToEdit(): void {
        this.toggleEdit = !this.toggleEdit;
    }

    getSavedNotification(evt) {
        this.toggleEdit = !evt;
    }

}
