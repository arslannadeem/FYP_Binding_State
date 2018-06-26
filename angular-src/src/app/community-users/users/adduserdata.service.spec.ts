import { TestBed, inject } from '@angular/core/testing';

import { AdduserdataService } from './adduserdata.service';

describe('AdduserdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdduserdataService]
    });
  });

  it('should be created', inject([AdduserdataService], (service: AdduserdataService) => {
    expect(service).toBeTruthy();
  }));
});
