/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PriorityService } from './priority.service';

describe('Service: Priority', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriorityService]
    });
  });

  it('should ...', inject([PriorityService], (service: PriorityService) => {
    expect(service).toBeTruthy();
  }));
});
