import { Component, OnInit } from '@angular/core';
import { EpicService } from '../_services/epic.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-epic',
  templateUrl: './Epic.component.html',
  styleUrls: ['./Epic.component.css']
})
export class EpicComponent implements OnInit {
  id: string;
  projectEpics: any = [];
  projectDetails: any = {};
  constructor(
    private epicService: EpicService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.epicService.currentId.subscribe(id => (this.id = id));
    if (this.id === '' || this.id === null) {
      this.id = localStorage.getItem('projectId');
      this.getProjectEpics(this.id);
    } else {
      localStorage.setItem('projectId', this.id);
      this.getProjectEpics(this.id);
    }
  }

  getProjectEpics(id: string) {
    this.epicService.getProjectEpics(this.id).subscribe(
      next => {
        console.log(next);
        this.projectEpics = next[0].epics;
        this.projectDetails.projectName = next[0].projectName;
        this.projectDetails.projectDescription = next[0].projectDescription;
        this.projectDetails.projectKey = next[0].projectKey;
        console.log('Epics in epic component', this.projectEpics);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  getEpicStories(id: number) {
    const Id = id.toString();
    this.epicService.getEpicStories(Id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
