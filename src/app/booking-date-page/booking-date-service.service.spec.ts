import { TestBed } from '@angular/core/testing';

import { BookingDateServiceService } from './booking-date-service.service';

describe('BookingDateServiceService', () => {
  let service: BookingDateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
