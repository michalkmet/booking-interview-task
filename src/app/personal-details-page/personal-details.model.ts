export interface PersonalData {
  firstName: string;
  lastName: string;
  personalIdentificationNumber: string;
  countryId: string;
  cityId?: string;
  email: string;
}

export interface PersonalDataResponse {
  message: string;
  reservationId: string;
  timestamp: string;
}
