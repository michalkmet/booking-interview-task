import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonalData, PersonalDataResponse } from './personal-details.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalDetailsService {
  constructor(private http: HttpClient) {}

  private savePersonalDataUrl = '/api/save-personal-data';

  savePersonalData(
    personalData: PersonalData
  ): Observable<PersonalDataResponse> {
    return this.http.post<PersonalDataResponse>(
      this.savePersonalDataUrl,
      personalData
    );
  }
}
