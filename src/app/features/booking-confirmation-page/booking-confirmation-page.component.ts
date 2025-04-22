import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTransferService } from 'src/app/core/services/data-transfer.service';

@Component({
  selector: 'app-booking-confirmation-page',
  imports: [CommonModule],
  templateUrl: './booking-confirmation-page.component.html',
  styleUrl: './booking-confirmation-page.component.css',
})
export class BookingConfirmationPageComponent implements OnInit {
  private dataTransferService = inject(DataTransferService);

  ngOnInit() {
    console.log('ngOnInit BookingConfirmationPageComponent');
    // TODO - some kinf of join of the two observables
    this.dataTransferService.pickedSlot$.subscribe((pickedSlot) => {
      if (pickedSlot) {
        console.log('Picked slot:', pickedSlot);
      }
    });
    this.dataTransferService.personalData$.subscribe((personalData) => {
      if (personalData) {
        console.log('PersonalData:', personalData);
      }
    });
  }
}
