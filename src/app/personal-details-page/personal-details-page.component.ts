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
  } else {
    // is invalid
    return { mustBeAdultPerson: true };
  }
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
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
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
  }
}
