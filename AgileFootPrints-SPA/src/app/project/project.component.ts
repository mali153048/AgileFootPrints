import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ProjectService } from '../_services/project.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { EpicService } from '../_services/epic.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  userId = this.authService.decodedToken.nameid;
  userProjects = [];
  projectEpics = [];
  modalRef: BsModalRef;
  isCollapsed = true;
  projectModel: any = {};

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private epicService: EpicService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserProjects();
  }

  getUserProjects() {
    this.projectService.getAllUserProjects(this.userId).subscribe(
      data => {
        this.userProjects = data;
        console.log(this.userProjects);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal() {
    this.modalRef.hide();
  }

  newProject() {
    this.projectModel.userId = this.authService.decodedToken.nameid;
    this.projectModel.statusId = 2;
    console.log(this.projectModel);
    this.projectService.newProject(this.projectModel).subscribe(
      success => {
        this.userProjects.push(success); // pushing newly created project into array
        this.closeModal();
        this.alertify.success('Project Created Successfully');
        this.router.navigate(['/project']);
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }

  getProjectEpics(id: number) {
    let projectId: string;
    projectId = id.toString();
    this.epicService.getProjectEpics(projectId).subscribe(success => {
      this.projectEpics = success;
      console.log(this.projectEpics);
    });
  }
}
