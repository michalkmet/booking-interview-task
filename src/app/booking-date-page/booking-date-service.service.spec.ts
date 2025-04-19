import { TestBed } from '@angular/core/testing';

import { BookingDateService } from './booking-date-service.service';

describe('BookingDateService', () => {
  let service: BookingDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
