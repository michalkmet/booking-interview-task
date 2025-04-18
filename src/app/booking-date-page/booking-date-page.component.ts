import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDateService } from './booking-date-service.service';
import { AvailableSlots } from './available-slot.model';

@Component({
  selector: 'app-booking-date-page',
  imports: [CommonModule],
  templateUrl: './booking-date-page.component.html',
  styleUrl: './booking-date-page.component.css',
})
export class BookingDatePageComponent implements OnInit {
  private bookingDateService = inject(BookingDateService);
  public availableSlots: AvailableSlots = {};

  ngOnInit() {
    console.log('BookingDatePageComponent initialized');

    this.bookingDateService.getAvailableSlots().subscribe((response) => {
      console.log('Response:', response);
      this.availableSlots = response.slots;
      console.log('Available Slots:', this.availableSlots);
    });
  }
}
