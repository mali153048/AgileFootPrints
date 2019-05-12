import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProjectRoleService {
  baseUrl = environment.apiUrl + 'userScrumRole/';
  constructor(private http: HttpClient) {}

  getScrumRoles(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getScrumRoles');
  }

  assignRole(
    userId: number,
    projectId: number,
    ScrumRolesId: number
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'assignRole', {
      userId,
      projectId,
      ScrumRolesId
    });
  }
}
