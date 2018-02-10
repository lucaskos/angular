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
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const changedReq = request.clone({ headers: request.headers.set('Authorization', localStorage.getItem('token')) });
    console.log('authorization');
    console.log(localStorage.getItem('token'));
    console.log(changedReq);
    return next.handle(changedReq);
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: localStorage.getItem('token')
    //   }
    // });
    // console.log('Token: ' + localStorage.getItem('token'));
    // console.log(request.headers.get('Authorization'));
    // return next.handle(request);
  }
}
