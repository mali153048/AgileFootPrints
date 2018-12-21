import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './UserProfile.component.html',
  styleUrls: ['./UserProfile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  isEdit = true;
  isEditButton = false;
  user: any = {};
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.getUser();
  }

  getUser() {
    const userId = this.userId.toString();
    this.userService.getUser(userId).subscribe(
      user => {
        this.user = user;
        console.log('fetched user: ', this.user);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  EditUser() {
    const userId = this.userId.toString();
    this.userService.editUser(this.user, userId).subscribe(
      editedUser => {
        this.user = editedUser;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  toggleEditBtn() {
    this.isEdit = false;
    this.isEditButton = true;
  }
}
