import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  baseUrl: any = environment.apiUrl + 'contributor/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  acceptContributorInviatation(model: any): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let userId = this.authService.decodedToken.nameid;
    return this.http.post<any>(
      this.baseUrl + 'newContributor/' + userId,
      model
    );
  }
}
