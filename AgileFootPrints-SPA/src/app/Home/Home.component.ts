import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  loginModel: any = {};
  registerMode = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.loginModel).subscribe(
      next => {
        console.log('loggedIn successfully');
      },
      error => {
        console.log('some error');
      }
    );
  }
  loggedIn() {
    // used to check if the user is logged in or not
    const token = localStorage.getItem('userToken');
    return !!token; // return true if there is token else false
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
