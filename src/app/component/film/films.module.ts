import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmDetailComponent} from './film-detail/film-detail.component';
import {FilmItemComponent} from './film-item/film-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FilmCreateComponent} from './film-edit/film-edit.component';
import {FilmRoutingModule} from './film-routing';
import {TranslateModule} from '@ngx-translate/core';
import {CommentItemComponent} from './comment-item/comment-item.component';
import {CommentDetailComponent} from './comment-detail/comment-detail.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
    declarations: [FilmDetailComponent, FilmItemComponent, FilmDetailComponent, FilmCreateComponent, CommentItemComponent, CommentDetailComponent, CommentComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FilmRoutingModule,
        TranslateModule,
    ]
})
export class FilmsModule {
}
