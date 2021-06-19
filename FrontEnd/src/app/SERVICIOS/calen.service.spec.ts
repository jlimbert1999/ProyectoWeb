import { TestBed } from '@angular/core/testing';

import { CalenService } from './calen.service';

describe('CalenService', () => {
  let service: CalenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
