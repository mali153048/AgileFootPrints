/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserProjectRoleService } from './UserProjectRole.service';

describe('Service: UserProjectRole', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProjectRoleService]
    });
  });

  it('should ...', inject([UserProjectRoleService], (service: UserProjectRoleService) => {
    expect(service).toBeTruthy();
  }));
});
