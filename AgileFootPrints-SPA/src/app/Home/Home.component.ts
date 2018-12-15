import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  loginModel: any = {};
  registerMode = false;
  workItems: any = [];
  user: any;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.loginModel).subscribe(
      next => {
        this.alertify.success('Logged In successfully');
      },
      error => {
        this.alertify.error(error.statusText);
      },
      () => {
        this.router.navigate(['/tasks']);
      }
    );
  }
  loggedIn() {
    // used to check if the user is logged in or not
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('userToken');
    this.alertify.success('Logged out');
    this.router.navigate(['/']);
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
