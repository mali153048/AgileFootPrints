import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpicService {
  baseUrl = environment.apiUrl + 'epic/';
  constructor(private http: HttpClient) {}

  getProjectEpics(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getEpics/' + id);
  }
}
