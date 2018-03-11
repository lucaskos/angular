import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Authorization');
    console.log('Storange in the interceptor ' + localStorage.getItem('Authorization'));
    console.log(request);
    if (token !== null) {
      console.log('token is not empty');
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    console.log(next);
    return next.handle(request);
  }
}
