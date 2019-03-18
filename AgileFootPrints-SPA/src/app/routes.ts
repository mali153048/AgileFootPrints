import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './_guards/auth.guard';
import { EpicComponent } from './Epic/Epic.component';
import { UserProfileComponent } from './UserProfile/UserProfile.component';
import { ProjectContributorsComponent } from './ProjectContributors/ProjectContributors.component';

export const appRoutes: Routes = [
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'epic',
    component: EpicComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contributors',
    component: ProjectContributorsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
