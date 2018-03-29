import {RegisterComponent} from '../component/user/register/register.component';
import {LoginComponent} from '../component/user/login/login.component';
import {FilmCreateComponent} from '../component/film/film-detail/film-edit.component';
import {DashboardComponent} from '../component/dashboard/dashboard.component';
import {FilmItemComponent} from '../component/film/film-item/film-item.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmDetailComponent} from '../component/film/film-detail/film-detail.component';
import {PersonComponent} from '../component/person/person-component/person.component';
import {PersonDetailComponent} from '../component/person/person-detail/person-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'films', component: FilmItemComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'film/:id', component: FilmDetailComponent},
  {path: 'films/new', component: FilmCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'person', component: PersonComponent},
  {path: 'person/:id', component: PersonDetailComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
