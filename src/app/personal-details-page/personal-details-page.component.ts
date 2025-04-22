import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonalDetailsService } from './personal-details.service';
import { PersonalData, PersonalDataResponse } from './personal-details.model';
import { Router } from '@angular/router';

function mustBeAdultPerson(control: AbstractControl) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const dateStrFromControl = control.value.substring(0, 6);
  const day = dateStrFromControl.substring(4);
  let month = dateStrFromControl.substring(2, 4);
  let year = dateStrFromControl.substring(0, 2);

  if (currentYear.toString().substring(0, 2) > year) {
    year = '20' + year;
  } else {
    year = '19' + year;
  }

  if (month > 12) {
    month = month - 50;
  }

  const dateOfBirth = new Date(`${year}-${month}-${day}`);

  const diffInYears = Math.floor(
    Math.floor(
      (today.getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24)
    ) / 365.25
  );

  if (diffInYears >= 18) {
    // is valid
    return null;
  }
  // is invalid
  return { mustBeAdultPerson: true };
}

@Component({
  selector: 'app-personal-details-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-details-page.component.html',
  styleUrl: './personal-details-page.component.css',
})
export class PersonalDetailsPageComponent implements OnInit {
  private personalDetailsService = inject(PersonalDetailsService);
  private router = inject(Router);

  personalDetailsForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    personalIndentificationNumber: new FormControl('', {
      validators: [Validators.required, mustBeAdultPerson],
    }),
    country: new FormControl<'sk' | 'cz'>('sk', {
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      validators: [],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  ngOnInit() {
    console.log('PersonalDetailsPageComponent initialized');
    this.updateCityValidators();
  }

  updateCityValidators(): void {
    const countryControl = this.personalDetailsForm.get('country');
    const cityControl = this.personalDetailsForm.get('city');

    this.setAndClearValidators(countryControl, cityControl);

    countryControl?.valueChanges.subscribe(() => {
      this.setAndClearValidators(countryControl, cityControl);
    });
  }

  setAndClearValidators(
    countryControl: AbstractControl | null,
    cityControl: AbstractControl | null
  ): void {
    if (countryControl?.value === 'sk') {
      console.log('Country is SK1');
      cityControl?.setValidators([
        Validators.required,
        Validators.minLength(2),
      ]);
    } else {
      cityControl?.clearValidators();
    }
    cityControl?.updateValueAndValidity();
  }

  get firstNameIsInvalid() {
    return (
      this.personalDetailsForm.controls.firstName.invalid &&
      this.personalDetailsForm.controls.firstName.touched &&
      this.personalDetailsForm.controls.lastName.dirty
    );
  }
  get lastNameIsInvalid() {
    return (
      this.personalDetailsForm.controls.lastName.invalid &&
      this.personalDetailsForm.controls.lastName.touched &&
      this.personalDetailsForm.controls.lastName.dirty
    );
  }

  get personalIndentificationNumberIsInvalid() {
    return (
      this.personalDetailsForm.controls.personalIndentificationNumber.invalid &&
      this.personalDetailsForm.controls.personalIndentificationNumber.touched &&
      this.personalDetailsForm.controls.personalIndentificationNumber.dirty
    );
  }

  get cityIsInvalid() {
    return (
      this.personalDetailsForm.controls.city.invalid &&
      this.personalDetailsForm.controls.email.touched &&
      this.personalDetailsForm.controls.email.dirty
    );
  }

  get emailIsInvalid() {
    return (
      this.personalDetailsForm.controls.email.invalid &&
      this.personalDetailsForm.controls.email.touched &&
      this.personalDetailsForm.controls.email.dirty
    );
  }

  onSubmit() {
    const personalData: PersonalData = {
      firstName: this.personalDetailsForm.value.firstName ?? '',
      lastName: this.personalDetailsForm.value.lastName ?? '',
      personalIdentificationNumber:
        this.personalDetailsForm.value.personalIndentificationNumber ?? '',
      countryId: this.personalDetailsForm.value.country ?? '',
      cityId: this.personalDetailsForm.value.city ?? '',
      email: this.personalDetailsForm.value.email ?? '',
    };

    console.log('personalData: ', personalData);
    // TODO: save personal Data somewhere

    this.personalDetailsService
      .savePersonalData(personalData)
      .subscribe({
        next: (personalDataResponse: PersonalDataResponse) => {
          console.log('personalData: ', personalDataResponse);
          // TODO: save reservationID?
          if (personalDataResponse.message === 'Reservation completed successfully'){
            this.router.navigate(['/confirmation']);
          }
        },
        error: (e) => console.error(e), // TODO: handle error
        complete: () => console.info('complete'),
      });
  }
}
