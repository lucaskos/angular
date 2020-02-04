import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {TokenStorage} from './token-storage';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {Observable} from 'rxjs/Observable';
import {throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorage,
                private router: Router,
                private userService: UserService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // must todo fixme has to fix missing bearer token in requests
        const token = this.token.getToken();
        if (token != null) {
            request = request.clone({
                headers: request.headers.set('Authorization', /* here you fetch your jwt */token)
                    .append('Access-Control-Allow-Origin', '*')
            });
        }
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (response: HttpErrorResponse) => {
            console.log(response);
        });
    }
}
