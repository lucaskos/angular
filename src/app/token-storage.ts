import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor() {
  }

  signOut() {
    window.sessionStorage.removeItem( TOKEN_KEY );
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    if (token) { // todo error from backends
      window.sessionStorage.removeItem( TOKEN_KEY );
      window.sessionStorage.setItem( TOKEN_KEY, token );
    }
  }

  public getToken(): string {
    return localStorage.getItem('currentUser');
    // return sessionStorage.getItem( TOKEN_KEY );
  }
}
