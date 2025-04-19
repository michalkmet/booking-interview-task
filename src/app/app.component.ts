import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingDatePageComponent } from './booking-date-page/booking-date-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BookingDatePageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
