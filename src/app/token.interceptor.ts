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

    console.log('Storange in the interceptor ' + localStorage.getItem('Authorization'));

    request = request.clone({
      setHeaders: {
        Authorization: localStorage.getItem('Authorization')
      }
    });

    return next.handle(request);
  }
}
