import { TestBed, inject } from '@angular/core/testing';

import { InsertblogService } from './insertblog.service';

describe('InsertblogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsertblogService]
    });
  });

  it('should be created', inject([InsertblogService], (service: InsertblogService) => {
    expect(service).toBeTruthy();
  }));
});
