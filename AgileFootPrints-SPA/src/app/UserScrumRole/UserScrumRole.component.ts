import { Component, OnInit } from '@angular/core';
import { ContributorService } from '../_services/contributor.service';
import { AlertifyService } from '../_services/alertify.service';
import { UserProjectRoleService } from '../_services/UserProjectRole.service';

@Component({
  selector: 'app-userscrumrole',
  templateUrl: './UserScrumRole.component.html',
  styleUrls: ['./UserScrumRole.component.css']
})
export class UserScrumRoleComponent implements OnInit {
  projectId: string;
  usersList = [];
  scrumRoles = [];
  selectedUserId: number;
  selectedRoleId: number;
  constructor(
    private contributorService: ContributorService,
    private userProjectRoleService: UserProjectRoleService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.projectId = localStorage.getItem('projectId');
    this.getProjectContributors();
    this.getScrumRoles();
  }

  getProjectContributors() {
    console.log(this.projectId);
    this.contributorService.getprojectContributors(this.projectId).subscribe(
      next => {
        this.usersList = next;
        console.log(this.usersList);
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  getScrumRoles() {
    this.userProjectRoleService.getScrumRoles().subscribe(
      next => {
        this.scrumRoles = next;
        console.log(this.scrumRoles);
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }

  assignRole() {
    this.userProjectRoleService
      .assignRole(
        this.selectedUserId,
        Number(this.projectId),
        this.selectedRoleId
      )
      .subscribe(
        next => {
          this.alertify.success('Role assigned');
        },
        error => {
          this.alertify.error(error.message);
        }
      );
  }
}
