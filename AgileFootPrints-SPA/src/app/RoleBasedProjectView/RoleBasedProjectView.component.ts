import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTabChangeEvent
} from '@angular/material';
import { ProjectService } from '../_services/project.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-rolebasedprojectview',
  templateUrl: './RoleBasedProjectView.component.html',
  styleUrls: ['./RoleBasedProjectView.component.css']
})
export class RoleBasedProjectViewComponent implements OnInit {
  userRolesList = [];
  projectId: string;
  projectName: string;
  tabIndex: number;
  projectInfo: any;
  space = ' ';
  constructor(
    private projectService: ProjectService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<RoleBasedProjectViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userRolesList = this.data.userRoleList;
    this.projectId = this.data.projectId;
  }

  ngOnInit() {
    console.log(this.data.userRoleList);
    this.getProjectName();
    this.getProjectInfo();
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    console.log(tabChangeEvent.tab.textLabel);
    this.tabIndex = tabChangeEvent.index;
    if (this.tabIndex === 0) {
      // basic project info
      this.getProjectInfo();
    } else if (this.tabIndex === 1) {
      // stories
    } else if (this.tabIndex === 2) {
      // sprint
    } else if (this.tabIndex === 3) {
      // epics
    } else if (this.tabIndex === 4) {
      // contributors
    }
  }
  getProjectName() {
    this.projectService.getProjectName(this.projectId).subscribe(next => {
      this.projectName = next.projectName;
    });
  }

  getProjectInfo() {
    this.projectService.getProject(this.projectId).subscribe(
      next => {
        console.log(next);
        this.projectInfo = next;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
}
