import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.apiUrl + 'notification/';
  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  sendnotification(notificationModel: any): Observable<any> {
    console.log(notificationModel);
    return this.http.post<any>(
      this.baseUrl + 'addNew',
      notificationModel // id,subject,message,username,projectId
    );
  }

  getNotifications() {
    // tslint:disable-next-line:prefer-const
    let userId: string = this.authService.decodedToken.nameid;
    console.log(userId);
    return this.http.get<any>(this.baseUrl + 'getNotifications/' + userId);
  }
}
