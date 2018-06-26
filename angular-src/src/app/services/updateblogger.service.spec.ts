import { TestBed, inject } from '@angular/core/testing';

import { UpdatebloggerService } from './updateblogger.service';

describe('UpdatebloggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatebloggerService]
    });
  });

  it('should be created', inject([UpdatebloggerService], (service: UpdatebloggerService) => {
    expect(service).toBeTruthy();
  }));
});
