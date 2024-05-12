import { TestBed } from '@angular/core/testing';

import { ExerciselogService } from './exerciselog.service';

describe('ExercielogService', () => {
  let service: ExerciselogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciselogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
