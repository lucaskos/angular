import { TokenInterceptor } from './token.interceptor';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { FilmCreateComponent } from './film-detail/film-edit.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { FilmService } from './services/film-service/film.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmItemComponent,
    FilmDetailComponent,
    DashboardComponent,
    FilmCreateComponent,
    LoginComponent,
    RegisterComponent
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
