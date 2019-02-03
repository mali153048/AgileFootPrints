/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SprintService } from './sprint.service';

describe('Service: Sprint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprintService]
    });
  });

  it('should ...', inject([SprintService], (service: SprintService) => {
    expect(service).toBeTruthy();
  }));
});
