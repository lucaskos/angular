import { User } from './../user';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { headersToString } from 'selenium-webdriver/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

    private authUrl = 'http://localhost:8080/filmdb/login';
    private authUrlTest = '';
    private headers = new Headers({ 'Content-Type': 'application/json' });
      private options = new RequestOptions({ headers: this.headers });
    private postResponse: Response;
    private saveJwt;
    public token: string;

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string) {

        const observ = this.http.post<any>(this.authUrl, { username: username, password: password });
        let a;
        observ.map(res => a = res.json());
        const headers1 = new Headers({ 'Content-Type': 'application/json' });
        console.log('**' + a);
        const sampleJSON = JSON.stringify({ username: username, password: password }, 
);

        const test = this.http.post('http://localhost:8080/filmdb/login', sampleJSON)
            .subscribe((res) => {
                console.log(res);
            });
        console.log(test);

        return this.http.post<any>(this.authUrl, { username: username, password: password })
            .map((response: Response) => {
                console.log('Response' + response);
                console.log(username + ' ' + password);
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
               
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    getToken(): String {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token ? token : '';
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
