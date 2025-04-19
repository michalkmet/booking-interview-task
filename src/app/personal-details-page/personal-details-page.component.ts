import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
      validators: [Validators.required],
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
    console.log('this.form: ', this.personalDetailsForm.value);
  }
}
