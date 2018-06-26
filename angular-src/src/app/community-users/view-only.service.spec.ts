import { TestBed, inject } from '@angular/core/testing';

import { ViewOnlyService } from './view-only.service';

describe('ViewOnlyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewOnlyService]
    });
  });

  it('should be created', inject([ViewOnlyService], (service: ViewOnlyService) => {
    expect(service).toBeTruthy();
  }));
});
