import { Component, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDateService } from './booking-date-service.service';
import { AvailableSlots } from './available-slot.model';
import { HeaderComponent } from '../../shared/header/header.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-booking-date-page',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    HeaderComponent,
    MatCardModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule
  ],
  templateUrl: './booking-date-page.component.html',
  styleUrl: './booking-date-page.component.css',
})
export class BookingDatePageComponent implements OnInit {
  private bookingDateService = inject(BookingDateService);
  public availableSlots: AvailableSlots = {};
  selected = model<Date | null>(null);

  bookingForm = new FormGroup({
    date: new FormControl<Date | null>(null),
    timeSlots: new FormControl<string | null>(null),
  });

  ngOnInit() {
    console.log('BookingDatePageComponent initialized');

    // TODO add response type
    this.bookingDateService.getAvailableSlots().subscribe((response) => {
      console.log('Response:', response);
      this.availableSlots = response.slots;
      console.log('Available Slots:', this.availableSlots);
    });
  }

  onSubmit(){
    console.log('submitted');
    console.log(this.bookingForm.value);
  }
}
