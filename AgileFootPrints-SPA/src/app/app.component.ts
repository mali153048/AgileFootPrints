import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService(); // angular serice that allows to manage jwt tokens
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  loggedIn() {
    // used to check if the user is logged in or not
    return this.authService.loggedIn();
  }
}
