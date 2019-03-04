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
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  toDo = [];
  inProgress = [];
  completed = [];
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
      // tslint:disable-next-line:prefer-const
      this.stories = response;
      this.stories.forEach(element => {
        if (element.statusId === 1) {
          this.toDo.push(element);
        } else if (element.statusId === 2) {
          this.inProgress.push(element);
        } else if (element.statusId === 3) {
          this.completed.push(element);
        }
      });
      console.log('New Response :', response);
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.container.data);
      console.log(event.previousContainer.data);
    }
  }
}
