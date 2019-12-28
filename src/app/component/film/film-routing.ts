import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FilmItemComponent} from './film-item/film-item.component';
import {FilmDetailComponent} from './film-detail/film-detail.component';
import {FilmCreateComponent} from './film-edit/film-edit.component';

const recipeRoutes: Routes = [
    {path: 'films', component: FilmItemComponent},
    {
        path: 'films/:id',
        component: FilmDetailComponent,
        children: [{path: 'edit', component: FilmCreateComponent}]
    },
    {path: 'film/new', component: FilmCreateComponent},
]

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [RouterModule]
})
export class FilmRoutingModule {

}
