import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {TokenStorage} from './token-storage';
import {Router} from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
    }
    return next.handle(authReq);
  }
}
