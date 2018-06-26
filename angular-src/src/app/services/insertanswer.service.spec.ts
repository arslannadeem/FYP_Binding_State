import { TestBed, inject } from '@angular/core/testing';

import { InsertanswerService } from './insertanswer.service';

describe('InsertanswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsertanswerService]
    });
  });

  it('should be created', inject([InsertanswerService], (service: InsertanswerService) => {
    expect(service).toBeTruthy();
  }));
});
