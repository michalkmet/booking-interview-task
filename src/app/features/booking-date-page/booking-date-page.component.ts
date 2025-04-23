import { Component, inject, model, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDateService } from './booking-date-service.service';
import { AvailableSlots } from './available-slot.model';
import { HeaderComponent } from '../../shared/header/header.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatListModule,
    MatProgressSpinnerModule,
    MatCalendar,
  ],
  templateUrl: './booking-date-page.component.html',
  styleUrl: './booking-date-page.component.css',
})
export class BookingDatePageComponent implements OnInit {
  private bookingDateService = inject(BookingDateService);
  public availableSlots: AvailableSlots = {};
  selectedDate = model<Date | null>(null);
  datesToHighlight: string[] = [];
  isLoading = true;
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  bookingForm = new FormGroup({
    date: new FormControl<string | null>(null),
    timeSlot: new FormControl<string | null>(null),
  });

  ngOnInit() {
    console.log('BookingDatePageComponent initialized');

    // TODO add response type
    this.bookingDateService.getAvailableSlots().subscribe((response) => {
      console.log('Response:', response);
      this.availableSlots = response.slots;
      console.log('Available Slots:', this.availableSlots);

      for (const [key, value] of Object.entries(this.availableSlots)) {
        console.log(`Date: ${key}`);
        console.log(`${key}: ${value}`);

        this.datesToHighlight.push(key);
      }
      console.log('datesToHighlight1:', this.datesToHighlight);

      if (this.calendar) {
        this.calendar.updateTodaysDate();
      }
      this.isLoading = false;
    });
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  dateClass = (date: Date): string => {
    const key = this.formatDate(date);
    console.log('key:', key);
    console.log('this.availableSlots:', this.availableSlots);
    console.log('this.availableSlots[key]:', this.availableSlots[key]);
    return this.availableSlots[key] ? 'available-date' : '';
  };

  onSubmit() {
    console.log('submitted');
    console.log(this.bookingForm.value);
  }
}
