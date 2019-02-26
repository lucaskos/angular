import {TokenInterceptor} from './token.interceptor';
import {UserService} from './services/user-service/user.service';
import {LoginComponent} from './component/user/login/login.component';
import {FilmCreateComponent} from './component/film/film-edit/film-edit.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FilmItemComponent} from './component/film/film-item/film-item.component';
import {FilmService} from './services/film-service/film.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilmDetailComponent} from './component/film/film-detail/film-detail.component';
import {AppRoutingModule} from './router/app-routing.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './component/user/register/register.component';
import {PersonComponent} from './component/person/person-component/person.component';
import {PersonService} from './services/person-service/person.service';
import {PersonDetailComponent} from './component/person/person-detail/person-detail.component';
import {TokenStorage} from './token-storage';
import { TestComponentComponent } from './component/test-component/test-component.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmItemComponent,
    FilmDetailComponent,
    DashboardComponent,
    FilmCreateComponent,
    LoginComponent,
    RegisterComponent,
    PersonComponent,
    PersonDetailComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FilmService, PersonService, UserService, TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
