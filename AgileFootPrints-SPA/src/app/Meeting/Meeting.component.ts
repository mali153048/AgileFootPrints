import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../_services/meeting.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { NewMeetingComponent } from '../NewMeeting/NewMeeting.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './Meeting.component.html',
  styleUrls: ['./Meeting.component.css']
})
export class MeetingComponent implements OnInit {
  projectId: string;
  meetings = [];

  constructor(
    public dialog: MatDialog,
    private meetingService: MeetingService,
    private alertify: AlertifyService
  ) {
    this.projectId = localStorage.getItem('projectId');
  }

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.meetingService.getProjectMeetings(this.projectId).subscribe(
      next => {
        console.log('meetings', next);
        this.meetings = next;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  createMeeting() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '470px';
    dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(NewMeetingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        console.log('Empty');
        return;
      }
      console.log('Hello world');
      console.log(result);
      this.meetingService.createMeeting(result).subscribe(
        () => {
          this.getMeetings();
          this.alertify.success('Meeting Scheduled Successfully');
        },
        error => {
          this.alertify.error(error.message);
        }
      );
    });
  }
}
