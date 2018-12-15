import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './_guards/auth.guard';

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
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
