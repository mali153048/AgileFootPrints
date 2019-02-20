/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClockServiceService } from './ClockService.service';

describe('Service: ClockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClockServiceService]
    });
  });

  it('should ...', inject([ClockServiceService], (service: ClockServiceService) => {
    expect(service).toBeTruthy();
  }));
});
