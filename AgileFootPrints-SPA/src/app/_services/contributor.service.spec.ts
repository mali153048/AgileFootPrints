/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContributorService } from './contributor.service';

describe('Service: Contributor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContributorService]
    });
  });

  it('should ...', inject([ContributorService], (service: ContributorService) => {
    expect(service).toBeTruthy();
  }));
});
