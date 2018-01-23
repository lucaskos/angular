import { FilmCreateComponent } from './film-detail/film-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { Film } from './film';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilmDetailComponent } from './film-detail/film-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'films', component: FilmItemComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'film/:id', component: FilmDetailComponent},
  {path: 'films/new', component: FilmCreateComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
