import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../_services/sidebar.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { ProjectService } from '../_services/project.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { EpicService } from '../_services/epic.service';
import { Router, NavigationEnd } from '@angular/router';
import { SprintService } from '../_services/sprint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EpicComponent } from '../Epic/Epic.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  userId = this.authService.decodedToken.nameid;
  navigationSubscription;
  userProjects = [];
  projectId: string;
  menus = [];
  routes = [];

  constructor(
    private authService: AuthService,
    public sidebarservice: SidebarService
  ) {
    this.routes = ['/project'];
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {}

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }
}