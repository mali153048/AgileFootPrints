import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ProjectService } from '../_services/project.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  userId = this.authService.decodedToken.nameid;
  userProjects: any = [];
  modalRef: BsModalRef;
  projectModel: any = {};
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private alertify: AlertifyService,
    private modalService: BsModalService
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

  newProject() {}
}
