import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { BookingApiResponse } from './available-slot.model';


@Injectable({
  providedIn: 'root',
})
export class BookingDateService {

  constructor(private http: HttpClient) {}

  getAvailableSlots(): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>('/api/available-slots');
  }
}
