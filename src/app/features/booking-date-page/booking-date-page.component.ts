import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDateService } from './booking-date-service.service';
import { AvailableSlots, BookingApiResponse, Slot, SubmitedDateAndTimeSlot } from './available-slot.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { Router } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './booking-date-page.component.html',
  styleUrl: './booking-date-page.component.css',
})
export class BookingDatePageComponent implements OnInit {
  private bookingDateService = inject(BookingDateService);
  private router = inject(Router);
  public availableSlots: AvailableSlots = {};
  selectedDate: Date | null = null;
  datesToHighlight: string[] = [];
  isLoading = true;
  timeSlots: Slot[] = [];
  submitedDateAndTimeSlot: SubmitedDateAndTimeSlot | null = null;
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  bookingForm = new FormGroup({
    selectedTimeSlot: new FormControl<string | null>(null, [Validators.required]),
  });

  ngOnInit() {
    console.log('BookingDatePageComponent initialized');

    // TODO add response type
    this.bookingDateService.getAvailableSlots().subscribe((response: BookingApiResponse) => {
      this.availableSlots = response.slots;

      for (const [key] of Object.entries(this.availableSlots)) {
        this.datesToHighlight.push(key);
      }

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
    return this.availableSlots[key] ? 'available-date' : '';
  };

  onDateSelected(date: Date | null): void {
    console.log('onDateSelected', date);
    if (date) {
      this.selectedDate = date;
      const key = this.formatDate(date);
      this.timeSlots = this.availableSlots[key] || [];
      this.bookingForm.reset(); // Clear previous selection
    }
  }

  onSubmit() {
    if (this.selectedDate && this.bookingForm.value.selectedTimeSlot) {
      console.log('this.formatDate(this.selectedDate):',this.formatDate(this.selectedDate));
      this.submitedDateAndTimeSlot = {
        date: this.formatDate(this.selectedDate),
        timeSlot: this.bookingForm.value.selectedTimeSlot,
      }
      this.bookingDateService.sendBookedSlot(JSON.stringify(this.submitedDateAndTimeSlot));
      this.router.navigate(['/personal']);
    }
  }
}
