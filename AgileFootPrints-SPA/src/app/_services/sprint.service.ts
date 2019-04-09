import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  public clock: Observable<Date>;
  sprintId: string;
  baseUrl = environment.apiUrl + 'sprint/';
  constructor(private http: HttpClient) {
    this.clock = interval(1000).pipe(
      map(tick => new Date()),
      share()
    );
  }

  getSprints(projectId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getSprints/' + projectId);
  }

  newSprint(projectId: string, sprint: any): Observable<any> {
    console.log('SprintName:' + sprint, 'Project Id: ', projectId);
    // tslint:disable-next-line:prefer-const
    let sp = {
      sprintName: sprint
    };
    return this.http.post<any>(this.baseUrl + 'newSprint/' + projectId, sp);
  }
  startSprint(id: number, SprintDates: any): Observable<any> {
    // tslint:disable-next-line:prefer-const
    this.sprintId = id.toString();
    return this.http.patch<any>(
      this.baseUrl + 'setSprintDates/' + this.sprintId,
      SprintDates
    );
  }

  getSprintStories(projectId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getSprintStories/' + projectId);
  }

  startNow(sprintIds: any) {
    console.log('SP ids', sprintIds);
    // return this.http.post<any>(this.baseUrl + 'startSprint', sprintIds);
  }
}
