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
  MatDialogConfig
} from '@angular/material';
import { StoryService } from '../_services/story.service';
import { NewStoryComponent } from '../newStory/newStory.component';
import { EditStoryComponent } from '../EditStory/EditStory.component';

@Component({
  selector: 'app-epic',
  templateUrl: './Epic.component.html',
  styleUrls: ['./Epic.component.css']
})
export class EpicComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  id: string;
  searchKey: string;
  storyId: string;
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
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(NewStoryComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
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
        // result = edited story
        console.log('Edited story', result);
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
