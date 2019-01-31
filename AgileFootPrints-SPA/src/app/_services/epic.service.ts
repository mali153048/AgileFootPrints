import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpicService {
  private IdSource = new BehaviorSubject('');
  currentId = this.IdSource.asObservable();
  epicId: string;
  baseUrl = environment.apiUrl + 'epic/';
  storyBaseUrl = environment.apiUrl + 'story/';

  constructor(private http: HttpClient) {}
  changeId(id: string) {
    this.IdSource.next(id);
  }
  getProjectEpics(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getEpics/' + id);
  }

  getEpicStories(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getEpicStories/' + id);
  }
  getEpic(epicId: string, proejctId: string): Observable<any> {
    console.log('Epic Id : ' + epicId + 'Project Id : ' + proejctId);
    return this.http.get<any>(
      this.baseUrl + 'getEpic/' + proejctId + '/' + epicId
    );
  }
  editEpic(id: number, epic: any): Observable<any> {
    // this.epicId = id.toString();
    return this.http.patch<any>(
      this.baseUrl + 'editEpic/' + id.toString(),
      epic
    );
  }
  newEpic(projectId: string, epicModel: any) {
    console.log(projectId, epicModel);
    return this.http.post(this.baseUrl + 'createEpic/' + projectId, epicModel);
  }
  deleteEpic(id: string) {
    return this.http.delete<any>(this.baseUrl + 'deleteEpic/' + id);
  }
}
