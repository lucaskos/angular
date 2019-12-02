import {TokenInterceptor} from './token.interceptor';
import {UserService} from './services/user.service';
import {LoginComponent} from './component/user/login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FilmService} from './services/film.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './router/app-routing.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './component/user/register/register.component';
import {PersonComponent} from './component/person/person-component/person.component';
import {PersonService} from './services/person.service';
import {PersonDetailComponent} from './component/person/person-detail/person-detail.component';
import {TokenStorage} from './token-storage';
import {TestComponentComponent} from './component/test-component/test-component.component';
import {FilmsModule} from './component/film/films.module';
import {CommentService} from './services/comment.service';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AlertService} from './services/alert-service';
import {StorageService} from './services/storage.service';
import {AlertComponent} from "./component/_alert/alert-component";
import {AdminComponent} from './component/admin/admin.component';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        PersonComponent,
        PersonDetailComponent,
        TestComponentComponent,
        AlertComponent,
        AdminComponent
    ],
    imports: [
        // ngx-translate and the loader module
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        FilmsModule
    ],
    providers: [FilmService, PersonService, UserService, TokenStorage, CommentService, AlertService, StorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
