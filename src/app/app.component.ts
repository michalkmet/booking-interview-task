import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingDatePageComponent } from './booking-date-page/booking-date-page.component';
import { PersonalDetailsPageComponent } from './personal-details-page/personal-details-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BookingDatePageComponent, PersonalDetailsPageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
