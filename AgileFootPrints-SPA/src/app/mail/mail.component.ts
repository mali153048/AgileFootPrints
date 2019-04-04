import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mailModel: any;
  to: string;
  projectId: string;
  subject: string;
  message: string;
  disable = false;
  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<MailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.to = this.data;
    this.disable = false;
  }
  send() {
    this.mailModel = {};
    // this.projectId = localStorage.getItem('projectId');
    this.mailModel.projectId = localStorage.getItem('projectId');
    this.mailModel.isNotification = false;
    this.mailModel.subject = this.subject;
    this.mailModel.message = this.message;
    this.mailModel.isMail = true;
    this.mailModel.sender = this.authService.decodedToken.unique_name;
    this.mailModel.reciever = this.to;
    this.dialogRef.close(this.mailModel);
  }

  close() {
    this.dialogRef.close(null);
  }
}
