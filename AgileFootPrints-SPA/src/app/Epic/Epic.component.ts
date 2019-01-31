import { Component, OnInit, ViewChild } from '@angular/core';
import { EpicService } from '../_services/epic.service';
import { AlertifyService } from '../_services/alertify.service';
import { ProjectService } from '../_services/project.service';
import { Router } from '@angular/router';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';
import { StoryService } from '../_services/story.service';
import { NewStoryComponent } from '../newStory/newStory.component';
import { EditStoryComponent } from '../EditStory/EditStory.component';
import { EditProjectComponent } from '../editProject/editProject.component';
import { EditEpicComponent } from '../EditEpic/EditEpic.component';
import { NewEpicComponent } from '../NewEpic/NewEpic.component';

@Component({
  selector: 'app-epic',
  templateUrl: './Epic.component.html',
  styleUrls: ['./Epic.component.css']
})
export class EpicComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  id: string;
  epicId: string;

  projectEdit: any = {};
  searchKey: string;
  storyId: string;
  epicToForward: any = {};
  storyToForward: any = {};
  projectEpics: any = [];
  projectStories: any = [];
  projectDetails: any = {};
  displayedColumns: string[] = [
    'priority',
    'storyName',
    'storyDescription',
    'epic',
    'actions'
  ];
  dataSource: MatTableDataSource<any>;
  constructor(
    private epicService: EpicService,
    private alertify: AlertifyService,
    private projectService: ProjectService,
    private storyService: StoryService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
    console.log('in project', id);

    this.epicService.getProjectEpics(this.id).subscribe(
      next => {
        console.log(next);
        this.projectEpics = next[0].epics;
        this.projectStories = next[0].stories;
        this.dataSource = new MatTableDataSource(this.projectStories); // setting datasource for datatable
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.projectDetails.projectName = next[0].projectName;
        this.projectDetails.projectDescription = next[0].projectDescription;
        this.projectDetails.projectKey = next[0].projectKey;
        console.log('Epics in epic component', this.projectEpics);
        console.log('Stories in epic component', this.projectStories);
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
  deleteProject() {
    this.alertify.confirm(
      'Are you sure you want to delete this project',
      () => {
        this.projectService.deleteProject(this.id).subscribe(
          res => {
            this.alertify.success('Project Deleted Successfully');
            this.router.navigate(['/project']);
          },
          error => {
            this.alertify.error(error.message);
          }
        );
      }
    );
  }
  editProject() {
    this.projectService.getProject(this.id).subscribe(project => {
      this.projectEdit = project;
      console.log(this.projectEdit);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        project: this.projectEdit
      };

      const dialogRef = this.dialog.open(EditProjectComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result === null) {
          return;
        }
        console.log(result);
        this.projectService.editProject(result.id, result).subscribe(
          newDetails => {
            this.projectDetails.projectName = newDetails.projectName;
            this.projectDetails.projectDescription =
              newDetails.projectDescription;
            this.projectDetails.projectKey = newDetails.projectKey;
            this.alertify.success('Project Updated successfully');
          },
          error => {
            this.alertify.error(error.message);
          }
        );
      });
    });
  }
  deleteStory(id: number) {
    this.storyId = id.toString();
    this.alertify.confirm('Confirm delete ? ', () => {
      this.storyService.deleteStory(this.storyId).subscribe(
        res => {
          this.getProjectEpics(this.id);
          this.alertify.success('Deleted successfully');
        },
        error => {
          this.alertify.error(error.message);
        }
      );
    });
  }
  onCreateNewStory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(NewStoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      console.log('Posted Story Model : ', result);
      this.storyService.newStory(result).subscribe(
        story => {
          // console.log('Story retuned from api :', story.result);
          this.getProjectEpics(this.id);
          this.alertify.success('New Story Creted');
        },
        error => {
          this.alertify.error(error.message);
        }
      );
    });
  }
  editStory(id: number) {
    this.storyService.getStory(id).subscribe(story => {
      this.storyToForward = story;
      console.log(this.storyToForward);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        storyDetails: this.storyToForward
      };

      const dialogRef = this.dialog.open(EditStoryComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result === null) {
          return;
        }
        this.storyService.editStory(result.id, result).subscribe(
          () => {
            this.getProjectEpics(this.id);
            this.alertify.success('Story Edited Successfully');
          },
          error => {
            this.alertify.error(error.message);
          }
        );
      });
    });
  }

  setEpicId(id: number) {
    this.epicId = id.toString();
    console.log('Epic Id: ' + this.epicId);
  }
  editEpic() {
    // this.eId = this.epicId.toString();
    this.epicService.getEpic(this.epicId, this.id).subscribe(epic => {
      this.epicToForward = epic;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        epic: this.epicToForward
      };

      const dialogRef = this.dialog.open(EditEpicComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result === null) {
          return;
        }
        this.epicService.editEpic(result.id, result).subscribe(
          () => {
            this.getProjectEpics(this.id);
            this.snackBar.open('Epic updated Successfully', 'OK');
          },
          error => {
            this.snackBar.open(error.message, 'OK');
          }
        );
      });
    });
  }
  deleteEpic() {
    this.alertify.confirm(
      'The Epic will be deleted. However the stories in Epics will not be deleted. Confirm Delete ? ',
      () => {
        this.epicService.deleteEpic(this.epicId).subscribe(
          res => {
            this.getProjectEpics(this.id);
            this.snackBar.open('Deleted successfully', 'OK');
          },
          error => {
            this.snackBar.open(error.message, 'OK');
          }
        );
      }
    );
  }

  newEpic() {
    this.epicService.getEpic(this.epicId, this.id).subscribe(epic => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(NewEpicComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result === null) {
          return;
        }
        this.epicService.newEpic(result).subscribe(
          () => {
            this.getProjectEpics(this.id);
            this.snackBar.open('Epic created Successfully', 'OK');
          },
          error => {
            this.snackBar.open(error.message, 'OK');
          }
        );
      });
    });
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
