import { Component, OnInit } from '@angular/core';
import { StoryService } from '../_services/story.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  userTasks = [];
  constructor(
    private spinner: NgxSpinnerService,
    private storyService: StoryService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getUserTasks();
  }

  getUserTasks() {
    const username = this.authService.decodedToken.unique_name;
    this.storyService.getUserTasks(username).subscribe(
      next => {
        this.userTasks = next;
        console.log('new methodss', this.userTasks);
      },
      error => {
        this.alertify.error(error.message);
      },
      () => {
        this.spinner.hide();
      }
    );
  }
}
