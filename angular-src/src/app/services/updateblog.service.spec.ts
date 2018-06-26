import { TestBed, inject } from '@angular/core/testing';

import { UpdateblogService } from './updateblog.service';

describe('UpdateblogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateblogService]
    });
  });

  it('should be created', inject([UpdateblogService], (service: UpdateblogService) => {
    expect(service).toBeTruthy();
  }));
});
