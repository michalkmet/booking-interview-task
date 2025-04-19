import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDateService } from './booking-date-service.service';

@Component({
  selector: 'app-booking-date-page',
  imports: [CommonModule],
  templateUrl: './booking-date-page.component.html',
  styleUrl: './booking-date-page.component.css',
})
export class BookingDatePageComponent {

  private bookingDateService = inject(BookingDateService);
  private availableSlots: any = null;
 
  ngOnInit(){
    console.log('BookingDatePageComponent initialized');

    this.bookingDateService.getAvailableSlots().subscribe((response) => {
      this.availableSlots = response.slots;
      console.log('Available Slots:', this.availableSlots);
    });
    
  } 
}
