import { TestBed, inject } from '@angular/core/testing';

import { InsertbloggerService } from './insertblogger.service';

describe('InsertbloggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsertbloggerService]
    });
  });

  it('should be created', inject([InsertbloggerService], (service: InsertbloggerService) => {
    expect(service).toBeTruthy();
  }));
});
