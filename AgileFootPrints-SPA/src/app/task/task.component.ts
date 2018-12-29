import { Component, OnInit } from '@angular/core';
import { StoryService } from '../_services/story.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  constructor(private storyService: StoryService) {}

  ngOnInit() {}
}
