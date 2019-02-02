import { Component, OnInit } from '@angular/core';
import { StoryService } from '../_services/story.service';
import { Observable } from 'rxjs';
import {
  BreakpointState,
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {}
}
