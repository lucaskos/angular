import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmCreateComponent } from './film-edit/film-edit.component';
import { FilmRoutingModule } from './film-routing';
import { CommentComponent } from './comment/comment.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommentItemComponent } from './comment-item/comment-item.component';

@NgModule({
  declarations: [FilmDetailComponent, FilmItemComponent, FilmDetailComponent, FilmCreateComponent, CommentComponent, CommentItemComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FilmRoutingModule,
    TranslateModule,
  ]
})
export class FilmsModule { }
