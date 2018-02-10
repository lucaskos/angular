import { Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8080/filmdb/login';

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<boolean> {

        const headers = new HttpHeaders();
        headers.append('Access-Control-Expose-Headers', 'Authorization');

        return this.http.post(this.authUrl, JSON.stringify({ username: username, password: password }),
        { headers: headers, observe: 'response' })
            .map((response) => {
                // login successful if there's a jwt token in the response
                const authHeader = response.headers.get('Authorization');
                // const token = response.json() && response.json().token;
                const token = response.headers.get('Authorization');
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', token);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
