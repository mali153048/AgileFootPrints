import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = {};
  users: { firstName: string; lastName: string; userName: string }[];
  workItem: any = [];
  decodedToken: any;
  jwtHelper = new JwtHelperService(); // angular serice that allows to manage jwt tokens
  baseUrl: any = environment.apiUrl + 'auth/'; // url to post data to

  constructor(private http: HttpClient) {}

  login(loginModel: any) {
    return this.http.post(this.baseUrl + 'login', loginModel).pipe(
      map((response: any) => {
        const check = response;
        this.user = response;
        console.log(response);
        if (check) {
          localStorage.setItem('userToken', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
        }
      })
    );
  }

  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'register', registerModel);
  }

  loggedIn() {
    const token = localStorage.getItem('userToken');
    return !this.jwtHelper.isTokenExpired(token); // return true if token is expired
  }

  getSearchableUsers(userName: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getUser/' + userName);
  }
}
