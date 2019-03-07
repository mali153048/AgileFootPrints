import { Component, OnInit } from '@angular/core';
import { StoryService } from '../_services/story.service';

import { SprintService } from '../_services/sprint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDragEnter
} from '@angular/cdk/drag-drop';
import { AlertifyService } from '../_services/alertify.service';

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
  toDoCount = 0;
  inProgressCount = 0;
  completedCount = 0;
  doughnutChartLabels = [];
  doughnutChartData = [];
  doughnutChartType: string;
  doughnutChartOptions: {};
  doughnutChartLegent: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private sprintService: SprintService,
    private storyService: StoryService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.getSprintStories();
      this.spinner.hide();
    }, 2000);

    this.initialization();
  }

  initialization() {
    this.doughnutChartLabels = ['TO DO', 'In Progress', 'Completed'];

    this.doughnutChartData = [20, 30, 100];

    this.doughnutChartType = 'doughnut';
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
          this.toDoCount += 1;
        } else if (element.statusId === 2) {
          this.inProgress.push(element);
          this.inProgressCount += 1;
        } else if (element.statusId === 3) {
          this.completed.push(element);
          this.completedCount += 1;
        }
      });
      console.log(this.stories);
      this.doughnutChartData = [
        this.toDoCount,
        this.inProgressCount,
        this.completedCount
      ];
    });
  }
  completeNotify() {
    this.alertify.confirm(
      'Not all stories have been completed, Do you wish to continue ?',
      () => {}
    );
  }
  dropToDo($event: CdkDragDrop<any>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
      console.log('ITEM', $event.item);
      this.updateStoryStatus($event.container.data, 1);
    }
  }

  dropInProgress($event: CdkDragDrop<any>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
      console.log('ITEM', $event.item);
      this.updateStoryStatus($event.container.data, 2);
    }
  }
  dropCompleted($event: CdkDragDrop<any>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
      console.log('ITEM', $event.item);

      this.updateStoryStatus($event.container.data, 3);
    }
  }

  updateStoryStatus(array: any, statusId: number) {
    // console.log('inside stories : ' + statusId, array);
    this.storyService.updateStoryStatus(array, statusId).subscribe(
      next => {
        this.toDo = [];
        this.inProgress = [];
        this.completed = [];
        this.toDoCount = 0;
        this.inProgressCount = 0;
        this.completedCount = 0;
        this.getSprintStories();
      },
      error => {
        console.log('error');
      }
    );
  }
}
