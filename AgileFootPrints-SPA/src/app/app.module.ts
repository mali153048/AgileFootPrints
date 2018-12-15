import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { ProjectComponent } from './project/project.component';
import { appRoutes } from './routes';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ProjectComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AlertifyService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
