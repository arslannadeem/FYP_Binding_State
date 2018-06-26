import { TestBed, inject } from '@angular/core/testing';

import { AddQuestionService } from './add-question.service';

describe('AddQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddQuestionService]
    });
  });

  it('should be created', inject([AddQuestionService], (service: AddQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
