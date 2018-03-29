import { TokenInterceptor } from './token.interceptor';
import { UserService } from './services/user-service/user.service';
import { LoginComponent } from './component/user/login/login.component';
import { FilmCreateComponent } from './component/film/film-detail/film-edit.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FilmItemComponent } from './component/film/film-item/film-item.component';
import { FilmService } from './services/film-service/film.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilmDetailComponent } from './component/film/film-detail/film-detail.component';
import { AppRoutingModule } from './router/app-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './component/user/register/register.component';
import { PersonComponentComponent } from './component/person/person-component/person-component.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmItemComponent,
    FilmDetailComponent,
    DashboardComponent,
    FilmCreateComponent,
    LoginComponent,
    RegisterComponent,
    PersonComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FilmService, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
