import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClockServiceService {
  private clock: Observable<Date>;

  constructor() {}

  start(startDate: Date, endDate: Date): Observable<Date> {
    return (this.clock = interval(1000).pipe(map(tick => new Date(startDate))));
  }
  getClock(): Observable<Date> {
    return this.clock;
  }
}
