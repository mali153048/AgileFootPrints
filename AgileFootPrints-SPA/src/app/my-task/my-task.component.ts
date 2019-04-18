import { Component, OnInit } from '@angular/core';
import { StoryService } from '../_services/story.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  userTasks = [];
  toDo = [];
  inProgress = [];
  completed = [];
  stories: any = [];
  space = ' ';
  constructor(
    private spinner: NgxSpinnerService,
    private storyService: StoryService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getUserTasks();
  }

  getUserTasks() {
    const username = this.authService.decodedToken.unique_name;
    this.storyService.getUserTasks(username).subscribe(
      next => {
        this.userTasks = next;
        this.userTasks.forEach(element => {
          if (element.statusId === 1) {
            this.toDo.push(element);
          } else if (element.statusId === 2) {
            this.inProgress.push(element);
          } else if (element.statusId === 3) {
            this.completed.push(element);
          }
          console.log('new methodss', this.userTasks);
          console.log(this.toDo);
          console.log(this.inProgress);
          console.log(this.completed);
        });
      },
      error => {
        this.alertify.error(error.message);
      }
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
    }
  }
}
