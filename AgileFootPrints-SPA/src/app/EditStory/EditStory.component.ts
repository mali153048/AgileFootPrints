import { Component, OnInit, Inject } from '@angular/core';
import { EpicService } from '../_services/epic.service';
import { PriorityService } from '../_services/priority.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewStoryComponent } from '../newStory/newStory.component';

@Component({
  selector: 'app-editstory',
  templateUrl: './EditStory.component.html',
  styleUrls: ['./EditStory.component.css']
})
export class EditStoryComponent implements OnInit {
  projectEpics = [];
  priorities = [];
  projectId: string;
  story: any = {};
  constructor(
    private epicService: EpicService,
    private priorityService: PriorityService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<EditStoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = localStorage.getItem('projectId');
    this.getProjectEpics();
    this.getPriorities();
  }

  ngOnInit() {
    this.story = this.data.storyDetails;
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
  save() {
    this.dialogRef.close(this.story);
  }
}
