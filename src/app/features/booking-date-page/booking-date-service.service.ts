import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { BookingApiResponse } from './available-slot.model';
import { DataTransferService } from 'src/app/core/services/data-transfer.service';


@Injectable({
  providedIn: 'root',
})
export class BookingDateService {

  private dataTransferService = inject(DataTransferService);

  constructor(private http: HttpClient) {}

  getAvailableSlots(): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>('/api/available-slots');
  }

  sendBookedSlot(bookedSlot: string) {
    this.dataTransferService.sendPickedSlot(bookedSlot);
  }
}
