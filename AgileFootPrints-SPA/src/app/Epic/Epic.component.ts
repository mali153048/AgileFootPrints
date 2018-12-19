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
  projectEpics = [];
  constructor(
    private epicService: EpicService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.epicService.currentId.subscribe(id => (this.id = id));
    this.getProjectEpics(this.id);
  }

  getProjectEpics(id: string) {
    this.epicService.getProjectEpics(this.id).subscribe(
      next => {
        this.projectEpics = next;
        console.log('Epics in epic component', this.projectEpics);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
