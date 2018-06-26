import { TestBed, inject } from '@angular/core/testing';

import { BlogsonkeyService } from './blogsonkey.service';

describe('BlogsonkeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogsonkeyService]
    });
  });

  it('should be created', inject([BlogsonkeyService], (service: BlogsonkeyService) => {
    expect(service).toBeTruthy();
  }));
});
