export interface Slot {
  id: string;
  time: string;
}

export interface AvailableSlots {
  [date: string]: Slot[];
}

export interface BookingApiResponse {
  slots: AvailableSlots;
}

export interface SubmitedDateAndTimeSlot {
  date: string;
  timeSlot: string;
}
