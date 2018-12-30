import { Component, OnInit } from '@angular/core';
import { EpicService } from '../_services/epic.service';

@Component({
  selector: 'app-newstory',
  templateUrl: './newStory.component.html',
  styleUrls: ['./newStory.component.css']
})
export class NewStoryComponent implements OnInit {
  projectId: string;
  projectEpics = [];
  storyModel: any = {};
  constructor(private epicService: EpicService) {}

  ngOnInit() {
    this.projectId = localStorage.getItem('projectId');
    this.getProjectEpics();
  }

  getProjectEpics() {
    this.epicService.getProjectEpics(this.projectId).subscribe(next => {
      this.projectEpics = next[0].epics;
      console.log('Epics fetched', this.projectEpics);
    });
  }

  SaveStory() {
    console.log('Story Model', this.storyModel);
  }
}
