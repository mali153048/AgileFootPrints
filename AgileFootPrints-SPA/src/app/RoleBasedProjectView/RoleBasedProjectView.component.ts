import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTabChangeEvent
} from '@angular/material';
import { ProjectService } from '../_services/project.service';
import { AlertifyService } from '../_services/alertify.service';
import { ContributorService } from '../_services/contributor.service';
import { StoryService } from '../_services/story.service';

@Component({
  selector: 'app-rolebasedprojectview',
  templateUrl: './RoleBasedProjectView.component.html',
  styleUrls: ['./RoleBasedProjectView.component.css']
})
export class RoleBasedProjectViewComponent implements OnInit {
  userRolesList = []; // userRoleList.scrumRolesId -> 1= ProductOwner, 2=ScrumMaster, 3= Developer
  stories = [];
  sprints = [];
  epics = [];
  contributors = [];
  projectId: string;
  proName: string;
  tabIndex: number;
  projectInfo: any = {};
  space = ' ';
  isProductOwner = false;
  isScrumMaster = false;
  isDeveloper = false;
  constructor(
    private projectService: ProjectService,
    private storyService: StoryService,
    private alertify: AlertifyService,
    private contributorService: ContributorService,
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
    this.getProjectStories();
    this.getProjectSprints();
    this.getProjectEpics();
    this.getProjectContributors();
    console.log('Role List', this.userRolesList);
    this.userRolesList.forEach(role => {
      if (role.scrumRolesId === 1) {
        this.isProductOwner = true;
      }
      if (role.scrumRolesId === 2) {
        this.isScrumMaster = true;
      }
      if (role.scrumRolesId === 3) {
        this.isDeveloper = true;
      }
    });
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
      this.getProjectStories();
    } else if (this.tabIndex === 2) {
      // sprint
      this.getProjectSprints();
    } else if (this.tabIndex === 3) {
      // epics
      this.getProjectEpics();
    } else if (this.tabIndex === 4) {
      // contributors
    }
  }

  getProjectName() {
    this.projectService.getProjectName(this.projectId).subscribe(
      next => {
        this.proName = next.projectName;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
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

  getProjectStories() {
    this.projectService.getProjectStories(this.projectId).subscribe(
      next => {
        console.log('Stories', next);
        this.stories = next;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  getProjectSprints() {
    this.projectService.getProjectSprints(this.projectId).subscribe(
      next => {
        // console.log('Sprints', next);
        this.sprints = next;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  getProjectEpics() {
    this.projectService.getProjectEpics(this.projectId).subscribe(
      next => {
        this.epics = next;
        // console.log('Epics', next);
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }

  getProjectContributors() {
    this.contributorService.getprojectContributors(this.projectId).subscribe(
      next => {
        console.log('Contributors', next);
        this.contributors = next;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }

  deleteStory(storyId: number) {
    const stId = storyId.toString();
    this.alertify.confirm(
      'The story will be deleted from original project as well. Confirm Delete ?',
      () => {
        this.storyService.deleteStory(stId).subscribe(
          next => {
            this.getProjectStories();
            this.alertify.success('Deleted Successfully');
          },
          error => {
            this.alertify.error(error.message);
          }
        );
      }
    );
  }
}
