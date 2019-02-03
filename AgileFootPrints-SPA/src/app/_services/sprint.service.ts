import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  baseUrl = environment.apiUrl + 'sprint/';
  constructor(private http: HttpClient) {}

  getSprints(projectId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getSprints/' + projectId);
  }
}
