import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTransferService } from 'src/app/core/services/data-transfer.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { combineLatest } from 'rxjs';
import { Slot } from '../booking-date-page/available-slot.model';
import { PersonalData } from '../personal-details-page/personal-details.model';

@Component({
  selector: 'app-booking-confirmation-page',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './booking-confirmation-page.component.html',
  styleUrl: './booking-confirmation-page.component.css',
})
export class BookingConfirmationPageComponent implements OnInit {
  private dataTransferService = inject(DataTransferService);
  pickedSlotParsed: Slot | null = null;
  personalData: PersonalData | null = null;

  ngOnInit() {
    const pickedSlot = this.dataTransferService.pickedSlot$;
    const personalData = this.dataTransferService.personalData$;

    combineLatest([pickedSlot, personalData]).subscribe(
      ([pickedSlotStr, personalData]) => {
        if (pickedSlotStr) {
          this.pickedSlotParsed = JSON.parse(pickedSlotStr);
        }

        if (personalData) {
          this.personalData = personalData;
        }
        // TODO - process the data  this.pickedSlotParsed & personalData
      }
    );
  }
}
