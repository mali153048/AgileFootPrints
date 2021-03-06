import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  loginModel: any = {};
  class1: string;
  class2: string;
  registerMode = false;
  workItems: any = [];
  user: any;
  notifications: any = [];

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {
    this.class1 = 'col-md-12';
    this.class2 = 'col-md-10';
  }

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
        this.router.navigate(['/project']);
      }
    );
  }
  loggedIn() {
    // used to check if the user is logged in or not
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('projectId');
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
