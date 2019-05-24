import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-newmeeting',
  templateUrl: './NewMeeting.component.html',
  styleUrls: ['./NewMeeting.component.css']
})
export class NewMeetingComponent implements OnInit {
  isModelStateValid = true;
  projectId = localStorage.getItem('projectId');
  meeting: any = {};
  minDate = new Date();
  maxDate = new Date(2099, 0, 1);
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<NewMeetingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('Meeting model', this.meeting);
  }

  schedule() {
    if (
      this.meeting.subject === undefined ||
      this.meeting.description === undefined ||
      this.meeting.Date === undefined ||
      this.meeting.startTime === undefined ||
      this.meeting.endTime === undefined ||
      this.meeting.venue === undefined
    ) {
      this.isModelStateValid = false;
    } else {
      this.isModelStateValid = true;
      this.meeting.projectId = this.projectId;
      this.meeting.userId = this.authService.decodedToken.nameid;
      this.dialogRef.close(this.meeting);
      console.log(this.meeting);
    }
  }
  cancel() {
    this.dialogRef.close(null);
  }
}
