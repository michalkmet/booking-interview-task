import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingDatePageComponent } from './booking-date-page.component';

describe('BookingDatePageComponent', () => {
  let component: BookingDatePageComponent;
  let fixture: ComponentFixture<BookingDatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingDatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
