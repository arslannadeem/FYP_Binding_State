import { TestBed, inject } from '@angular/core/testing';

import { ModifyQuestionService } from './modify-question.service';

describe('ModifyQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyQuestionService]
    });
  });

  it('should be created', inject([ModifyQuestionService], (service: ModifyQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
