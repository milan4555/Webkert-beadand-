import { TestBed } from '@angular/core/testing';

import { GymsessionService } from './gymsession.service';

describe('GymsessionService', () => {
  let service: GymsessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymsessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
