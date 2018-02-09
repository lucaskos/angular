import { Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    headers_new: Headers;
    options_new: RequestOptions;

    private authUrl = 'http://localhost:8080/filmdb/login';

    constructor(private http: HttpClient) {
        this.headers_new = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Access-Control-Expose-Headers': 'Authorization'
        });
        this.options_new = new RequestOptions({ headers: this.headers_new });
    }

    login(username: string, password: string): Observable<boolean> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer');
        headers.append('Access-Control-Allow-Headers', 'Authorization');

        const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            headers1: new HttpHeaders({ 'Access-Control-Expose-Headers': 'Authorization' }),
            headers2: new HttpHeaders({ 'Access-Control-Allow-Headers': 'Authorization'}),
            headers3: new HttpHeaders({ 'Authorization': 'Bearer' }),
        };

        const test = this.http.post(this.authUrl, { username: username, password: password }, {headers: headers});

        console.log(test);

        const object = this.http.post(this.authUrl, JSON.stringify({ username: username, password: password }), 
        { headers: headers, observe: 'response' })
            .subscribe(
            (resp) => {
                let header: HttpHeaders = resp.headers;
                console.log(header.get('Content-Type'));
                console.log(header.get('Bearer'));
                console.log(header.get('Access-Control-Allow-Headers'));
                console.log(header.get('Authorization'));
                return header;
            });

       // console.log('object ' + object.headers.get('Authorization'));

        const post = this.http
            .post(this.authUrl, JSON.stringify({ username: username, password: password }), httpOptions)
            .subscribe(
            data => {
               return data;
            });
        console.log('res ' + post.toString());

        const a = this.http.post(this.authUrl, JSON.stringify({ username: username, password: password }), httpOptions);
        return this.http.post(this.authUrl, JSON.stringify({ username: username, password: password }), httpOptions)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const authHeader = response.headers.get('Authorization');
                const authHeader1 = response.headers.get('Bearer');
                console.log('Header :' + authHeader);
                console.log(authHeader1);
                const token = response.json() && response.json().token;
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error: any) => Observable.throw(error|| 'Server error'));
    }


    private extractData(res: Response) {
    let body = res.json();
    return body || {};
}


}
