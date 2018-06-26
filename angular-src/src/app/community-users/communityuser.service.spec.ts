import { TestBed, inject } from '@angular/core/testing';

import { CommunityuserService } from './communityuser.service';

describe('CommunityuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunityuserService]
    });
  });

  it('should be created', inject([CommunityuserService], (service: CommunityuserService) => {
    expect(service).toBeTruthy();
  }));
});
