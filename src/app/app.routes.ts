import { Route } from '@angular/router';
import { BookingDatePageComponent } from './booking-date-page/booking-date-page.component';
import { PersonalDetailsPageComponent } from './personal-details-page/personal-details-page.component';
import { BookingConfirmationPageComponent } from './booking-confirmation-page/booking-confirmation-page.component';

export const appRoutes: Route[] = [
  { path: '', component: BookingDatePageComponent },
  { path: 'date', component: BookingDatePageComponent },
  { path: 'personal', component: PersonalDetailsPageComponent },
  { path: 'confirmation', component: BookingConfirmationPageComponent },
  { path: '**', component: BookingDatePageComponent },
];
