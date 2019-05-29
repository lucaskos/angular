import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmCreateComponent } from './film-edit/film-edit.component';
import { FilmRoutingModule } from './film-routing';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [FilmDetailComponent, FilmItemComponent, FilmDetailComponent, FilmCreateComponent, CommentComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FilmRoutingModule
  ]
})
export class FilmsModule { }
