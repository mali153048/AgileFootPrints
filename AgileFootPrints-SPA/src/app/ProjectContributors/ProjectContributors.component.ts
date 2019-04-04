import { Component, OnInit } from '@angular/core';
import { Observable, pipe, config, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { v } from '@angular/core/src/render3';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
  MatDialogConfig,
  MatDialog
} from '@angular/material';
import { ProjectContributorBottomSheetComponent } from '../ProjectContributorBottomSheet/ProjectContributorBottomSheet.component';
import { NotificationService } from '../_services/notification.service';
import { AlertifyService } from '../_services/alertify.service';
import { ContributorService } from '../_services/contributor.service';
import { NewStoryComponent } from '../newStory/newStory.component';
import { MailComponent } from '../mail/mail.component';
import { ToastrManager } from 'ng6-toastr-notifications';
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
  isDuplicate = false;
  removeSuccess = false;
  projectId: string;
  contributors = [];
  space = ' ';
  constructor(
    public toastr: ToastrManager,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private notificationService: NotificationService,
    private alertify: AlertifyService,
    private contributorService: ContributorService
  ) {}

  ngOnInit() {
    this.currentUserName = this.authService.decodedToken.unique_name;
    this.projectId = localStorage.getItem('projectId');
    this.getContributors();
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
            const duplicateUser: string = this.contributors.find(
              x => x.userName === this.userName
            );
            if (duplicateUser) {
              this.isDuplicate = true;
              setInterval(() => {
                this.isDuplicate = false;
              }, 5000);

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

  getContributors() {
    this.contributorService.getprojectContributors(this.projectId).subscribe(
      next => {
        this.contributors = next;
        console.log('contributors:', this.contributors);
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  removeContributor(contributorModel: any) {
    this.contributorService
      .removeContributor(contributorModel, this.projectId)
      .subscribe(
        () => {
          this.getContributors();

          this.removeSuccess = true;
          setInterval(() => {
            this.removeSuccess = false;
          }, 3000);
        },
        error => {
          this.alertify.error(error.message);
        }
      );
    console.log(contributorModel);
  }
  contact(recieverUserName: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = recieverUserName;

    const dialogRef = this.dialog.open(MailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        return;
      }
      console.log(result);
      this.notificationService.sendMail(result).subscribe(
        () => {
          this.toastr.successToastr('Your mail has been sent', 'Delivered', {
            position: 'top-right'
          });
        },
        error => {
          this.toastr.errorToastr(error.message);
        }
      );
    });
  }
}
