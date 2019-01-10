import { Component, OnInit, Inject } from '@angular/core';
import { EpicService } from '../_services/epic.service';
import { PriorityService } from '../_services/priority.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-newstory',
  templateUrl: './newStory.component.html',
  styleUrls: ['./newStory.component.css']
})
export class NewStoryComponent implements OnInit {
  projectId: string;
  projectEpics = [];
  priorities = [];
  storyModel: any = {};
  constructor(
    private epicService: EpicService,
    private priorityService: PriorityService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<NewStoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.projectId = localStorage.getItem('projectId');
    this.getProjectEpics();
    this.getPriorities();
  }

  getProjectEpics() {
    this.epicService.getProjectEpics(this.projectId).subscribe(next => {
      this.projectEpics = next[0].epics;
      console.log('Epics fetched', this.projectEpics);
    });
  }

  getPriorities() {
    this.priorityService.getPriorities().subscribe(
      res => {
        this.priorities = res;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  SaveStory() {
    this.storyModel.projectId = this.projectId;
    this.dialogRef.close(this.storyModel);
  }
  Close() {
    this.dialogRef.close();
  }
}
