import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  public clock: Observable<Date>;

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
}
