import { Route } from '@angular/router';
import { BookingDatePageComponent } from './features/booking-date-page/booking-date-page.component';
import { PersonalDetailsPageComponent } from './features/personal-details-page/personal-details-page.component';
import { BookingConfirmationPageComponent } from './features/booking-confirmation-page/booking-confirmation-page.component';

export const appRoutes: Route[] = [
  { path: '', component: BookingDatePageComponent },
  { path: 'date', component: BookingDatePageComponent },
  { path: 'personal', component: PersonalDetailsPageComponent },
  { path: 'confirmation', component: BookingConfirmationPageComponent },
  { path: '**', component: BookingDatePageComponent },
];
