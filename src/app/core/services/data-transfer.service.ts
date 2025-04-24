import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonalData } from 'src/app/features/personal-details-page/personal-details.model';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private readonly pickedSlot = new BehaviorSubject<string | null>(null);
  pickedSlot$ = this.pickedSlot.asObservable();
  private readonly personalData = new BehaviorSubject<PersonalData | null>(
    null
  );
  personalData$ = this.personalData.asObservable();

  sendPickedSlot(slot: string) {
    this.pickedSlot.next(slot);
  }

  sendPersonalData(data: PersonalData) {
    this.personalData.next(data);
  }
}
