import { TestBed, inject } from '@angular/core/testing';

import { BlogdataService } from './blogdata.service';

describe('BlogdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogdataService]
    });
  });

  it('should be created', inject([BlogdataService], (service: BlogdataService) => {
    expect(service).toBeTruthy();
  }));
});
