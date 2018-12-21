import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'user/';
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getUser/' + id);
  }

  editUser(user: any, id: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + 'editUser/' + id, user);
  }
}
