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
  userRole = [];
  space = ' ';
  selectedUserId: number;
  selectedRoleId: number;
  disableBtn = false;
  constructor(
    private contributorService: ContributorService,
    private userProjectRoleService: UserProjectRoleService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.projectId = localStorage.getItem('projectId');
    this.getProjectContributors();
    this.getScrumRoles();
    this.getUserRoles();
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
    console.log(
      'UserRoleIds: ' + this.selectedRoleId + ' ' + this.selectedUserId
    );
    if (
      this.selectedRoleId === undefined ||
      this.selectedUserId === undefined
    ) {
      this.disableBtn = true;
      return;
    } else {
      this.disableBtn = false;
      this.userProjectRoleService
        .assignRole(
          this.selectedUserId,
          Number(this.projectId),
          this.selectedRoleId
        )
        .subscribe(
          next => {
            this.alertify.success('Role assigned');
            this.getUserRoles();
          },
          error => {
            if (error.status === 400) {
              this.alertify.message(
                'The role is already assigned to this User'
              );
            }
          }
        );
    }
  }

  getUserRoles() {
    this.userProjectRoleService.getUserRoles(this.projectId).subscribe(
      next => {
        this.userRole = next;
        console.log('ids', next);
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }

  deleteRole(roleModel: any) {
    this.alertify.confirm(
      'Are you sure you want to remove this user from role ?',
      () => {
        this.userProjectRoleService
          .removeRole(this.projectId, roleModel)
          .subscribe(
            () => {
              const index: number = this.userRole.indexOf(roleModel);
              if (index !== -1) {
                this.userRole.splice(index, 1);
              }
              this.alertify.success('Removed');
            },
            error => {
              this.alertify.error(error.message);
            }
          );
      }
    );
  }
}
