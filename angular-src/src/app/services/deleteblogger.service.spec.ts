import { TestBed, inject } from '@angular/core/testing';

import { DeletebloggerService } from './deleteblogger.service';

describe('DeletebloggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletebloggerService]
    });
  });

  it('should be created', inject([DeletebloggerService], (service: DeletebloggerService) => {
    expect(service).toBeTruthy();
  }));
});
