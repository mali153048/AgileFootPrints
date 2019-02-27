import { Component, OnInit } from '@angular/core';
import { StoryService } from '../_services/story.service';
import { Observable } from 'rxjs';
import {
  BreakpointState,
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { SprintService } from '../_services/sprint.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  toDo: any = [];
  inProgress: any = [];
  completed: any = [];
  stories: any = [];
  constructor(
    private spinner: NgxSpinnerService,
    private sprintService: SprintService
  ) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.getSprintStories();
      this.spinner.hide();
    }, 2000);
  }

  getSprintStories() {
    // tslint:disable-next-line:prefer-const
    let projectId: string = localStorage.getItem('projectId');
    this.sprintService.getSprintStories(projectId).subscribe(response => {
      console.log('the response is  : ', response);
      response.forEach(element => {
        this.stories = Object.assign(this.stories, element.stories);
      });
      this.stories.forEach(element => {
        if (element.statusId === 1) {
          this.toDo.push(element);
        } else if (element.statusId === 2) {
          this.inProgress.push(element);
        } else if (element.statusId === 3) {
          this.completed.push(element);
        }
      });
      console.log('Stories', this.stories);
    });
  }

  drop($event) {}
}
