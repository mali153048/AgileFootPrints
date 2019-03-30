import { Component, OnInit, Inject } from '@angular/core';
import { EpicService } from '../_services/epic.service';
import { PriorityService } from '../_services/priority.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContributorService } from '../_services/contributor.service';
import { SprintService } from '../_services/sprint.service';

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
  contributors = [];
  sprints = [];
  space = ' ';
  isInValid = true;
  constructor(
    private epicService: EpicService,
    private priorityService: PriorityService,
    private alertify: AlertifyService,
    private sprintService: SprintService,
    private contributorService: ContributorService,
    public dialogRef: MatDialogRef<NewStoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.projectId = localStorage.getItem('projectId');
    this.getProjectEpics();
    this.getPriorities();
    this.getProejectContributors();
    this.getSprints();
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
  getProejectContributors() {
    this.contributorService.getprojectContributors(this.projectId).subscribe(
      next => {
        this.contributors = next;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  getSprints() {
    this.sprintService.getSprints(this.projectId).subscribe(
      next => {
        this.sprints = next;
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
  check() {
    if (
      this.storyModel.storyName === null ||
      this.storyModel.storyName === ''
    ) {
      this.isInValid = true;
    } else {
      this.isInValid = false;
    }
  }
}
