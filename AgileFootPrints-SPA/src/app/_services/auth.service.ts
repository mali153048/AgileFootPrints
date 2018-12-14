import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedToken: any;
  jwtHelper = new JwtHelperService(); // angular serice that allows to manage jwt tokens
  baseUrl: any = 'http://localhost:5000/api/auth/'; // url to post data to

  constructor(private http: HttpClient) {}

  login(loginModel: any) {
    return this.http.post(this.baseUrl + 'login', loginModel).pipe(
      map((response: any) => {
        const check = response;
        console.log(response);
        if (check) {
          localStorage.setItem('userToken', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
          console.log(this.decodedToken);
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
}
