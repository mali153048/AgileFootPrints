import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatBadgeModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { ProjectComponent } from './project/project.component';
import { appRoutes } from './routes';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProjectService } from './_services/project.service';
import { EpicService } from './_services/epic.service';
import { EpicComponent } from './Epic/Epic.component';
import { UserProfileComponent } from './UserProfile/UserProfile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ProjectComponent,
    TaskComponent,
    EpicComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    DataTableModule,
    DragDropModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatBadgeModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    ProjectService,
    EpicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
