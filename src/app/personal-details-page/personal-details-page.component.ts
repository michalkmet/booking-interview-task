import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
export class PersonalDetailsPageComponent {
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
    country: new FormControl('', {
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

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

  get emailIsInvalid() {
    return (
      this.personalDetailsForm.controls.email.invalid &&
      this.personalDetailsForm.controls.email.touched &&
      this.personalDetailsForm.controls.email.dirty
    );
  }

  onSubmit() {
    console.log('this.form: ', this.personalDetailsForm);
    console.log('this.form.value: ', this.personalDetailsForm.value);
    console.log('this.form.value.controls.firstname: ', this.personalDetailsForm.controls.firstName);

    // call service to save data
  }
}
