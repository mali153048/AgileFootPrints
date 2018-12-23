import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl + 'project/';
  constructor(private http: HttpClient) {}

  getAllUserProjects(userId): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getUserProjects/' + userId);
  }

  newProject(projectModel: any): Observable<any> {
    return this.http.post(this.baseUrl + 'createNewProject', projectModel);
  }

  deleteProject(id: string) {
    return this.http.delete(this.baseUrl + 'deleteproject/' + id);
  }
}
