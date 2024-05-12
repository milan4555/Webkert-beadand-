import { TestBed } from '@angular/core/testing';

import { ExerciseLogInfoService } from './exercise-log-info.service';

describe('ExerciseLogInfoService', () => {
  let service: ExerciseLogInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseLogInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
