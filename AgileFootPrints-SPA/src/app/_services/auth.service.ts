import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: any = 'http://localhost:5000/api/auth/'; // url to post data to
  user: any = {}; // store user data
  workitems: any = []; // store wotkitems

  constructor(private http: HttpClient) {}

  login(loginModel: any) {
    return this.http.post(this.baseUrl + 'login', loginModel).pipe(
      map((response: any) => {
        const check = response;
        console.log(response);
        if (check) {
          this.user.id = response.id;
          this.user.username = response.userName;
          this.user.email = response.email;
          this.user.phone = response.phoneNumber;
          this.user.firtsName = response.firstName;
          this.user.lastName = response.lastName;
          localStorage.setItem('userToken', response.token);
          console.log(this.user);
        }
      })
    );
  }

  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'register', registerModel);
  }
}
