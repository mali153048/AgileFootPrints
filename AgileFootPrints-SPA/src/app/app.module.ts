import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatBadgeModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule
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
import { NewStoryComponent } from './newStory/newStory.component';
import { EditStoryComponent } from './EditStory/EditStory.component';
import { EditProjectComponent } from './editProject/editProject.component';
import { EditEpicComponent } from './EditEpic/EditEpic.component';
import { NewEpicComponent } from './NewEpic/NewEpic.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NewSprintComponent } from './NewSprint/NewSprint.component';
import { SprintConfigComponent } from './SprintConfig/SprintConfig.component';
import { range, from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ProjectComponent,
    TaskComponent,
    EpicComponent,
    UserProfileComponent,
    NewStoryComponent,
    EditStoryComponent,
    EditProjectComponent,
    EditEpicComponent,
    NewEpicComponent,
    NewSprintComponent,
    SprintConfigComponent
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
    MatBadgeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSnackBarModule,
    NgMatSearchBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
    BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    ProjectService,
    EpicService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewStoryComponent,
    EditStoryComponent,
    EditProjectComponent,
    EditEpicComponent,
    NewEpicComponent,
    NewSprintComponent,
    SprintConfigComponent
  ]
})
export class AppModule {}
