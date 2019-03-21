import { Component, OnInit } from '@angular/core';
import { Observable, pipe, config } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { v } from '@angular/core/src/render3';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { ProjectContributorBottomSheetComponent } from '../ProjectContributorBottomSheet/ProjectContributorBottomSheet.component';
import { NotificationService } from '../_services/notification.service';
import { AlertifyService } from '../_services/alertify.service';
const states = ['Alabama', 'Alaska', 'American Samoa'];
@Component({
  selector: 'app-projectcontributors',
  templateUrl: './ProjectContributors.component.html',
  styleUrls: ['./ProjectContributors.component.css']
})
export class ProjectContributorsComponent implements OnInit {
  currentUserName: string;
  userSearched: any;
  userName: string;
  invalidUserNameCheck = false;
  isUserNull = false;
  successNotify = false;
  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private notificationService: NotificationService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.currentUserName = this.authService.decodedToken.unique_name;
  }

  checkUserName() {
    if (this.userName === this.currentUserName) {
      this.invalidUserNameCheck = true;
    } else {
      this.invalidUserNameCheck = false;
    }
  }
  getUser() {
    const sheetConfig = new MatBottomSheetConfig();
    sheetConfig.autoFocus = true;
    sheetConfig.disableClose = true;
    if (this.userName === this.currentUserName) {
      return null;
    }
    this.authService.getSearchableUsers(this.userName).subscribe(
      res => {
        // this.userSearched = res;

        if (res === null) {
          this.isUserNull = true;
        } else {
          this.isUserNull = false;
          sheetConfig.data = res;

          // tslint:disable-next-line:prefer-const
          let sheet = this.bottomSheet.open(
            ProjectContributorBottomSheetComponent,
            sheetConfig
          );

          sheet.afterDismissed().subscribe(result => {
            if (result === null) {
              return;
            }
            result.reciever = this.userName;
            result.sender = this.authService.decodedToken.unique_name;
            this.notificationService.sendnotification(result).subscribe(
              () => {
                this.successNotify = true;
                setInterval(() => {
                  this.successNotify = false;
                }, 5000);
              },
              error => {
                this.alertify.error(error.message);
              }
            );
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
