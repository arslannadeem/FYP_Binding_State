import { TestBed, inject } from '@angular/core/testing';

import { ModifyTopicService } from './modify-topic.service';

describe('ModifyTopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyTopicService]
    });
  });

  it('should be created', inject([ModifyTopicService], (service: ModifyTopicService) => {
    expect(service).toBeTruthy();
  }));
});
