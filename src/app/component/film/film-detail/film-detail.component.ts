import { Film } from '../../../classes/film';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../../../services/film-service/film.service';
import { UserService } from '../../../services/user-service/user.service';

@Component( {
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: [ './film-detail.component.css' ]
} )
export class FilmDetailComponent implements OnInit {
  @Output() film: Film;
  toggleEdit = false;
  id: number;
  isAuthenticated;

  constructor(private filmService: FilmService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated();
    console.log(this.isAuthenticated);
    this.id = +this.route.snapshot.paramMap.get( 'id' );
    this.filmService.getFilm( this.id ).subscribe(
      (film: Film) => this.film = film,
      (error) => console.log( 'error: ' + error )
    );
  }

  deleteFilm() {
    this.filmService.delete( this.film ).subscribe( () => {
        this.router.navigate( [ 'films/' ] );
      },
      (error => {
        console.log( error );
      }) );
  }

  loadFilmToEdit(): void {
    if (this.toggleEdit) {
      this.toggleEdit = false;
    } else {
      this.toggleEdit = true;
    }
  }

  getSavedNotification(evt) {
    console.log(evt);
    this.toggleEdit = !evt;
  }

  showCommentBox(evt) {
    console.log(evt);

  }

}
