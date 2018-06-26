import { TestBed, inject } from '@angular/core/testing';

import { BloggerslistService } from './bloggerslist.service';

describe('BloggerslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloggerslistService]
    });
  });

  it('should be created', inject([BloggerslistService], (service: BloggerslistService) => {
    expect(service).toBeTruthy();
  }));
});
