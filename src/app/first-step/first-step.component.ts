import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService, FormData } from '../service/form-data.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  regisForm!: FormGroup;
  errorName: string = '';
  errorLastName: string = ''
  errorAge: string = ''

  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.registration();
    const formData = this.formDataService.getFormData()
    if(this.formDataService.getFormData() !== null) {
      this.regisForm.setValue({
        firstname: formData?.firstname,
        lastname: formData?.lastname,
        age: formData?.age
      })
    }
  }

  registration() {
    this.regisForm = this.fb.group({
      firstname: ['', [Validators.required, this.noNumbersValidator]],
      lastname: ['', [Validators.required, this.noNumbersValidator]],
      age: [
        '',
        [
          Validators.required, 
          this.positiveNumberValidator, 
        ],
      ],
    });
  }

  noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const hasNumbers = /\d/.test(value);
    return hasNumbers ? { noNumbers: true } : null;
  }

  positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value !== '' && (isNaN(value) || value <= 0)) {
      return { positiveNumber: true };
    }
    return null;
  }

  onSubmit() {
    if (this.regisForm.valid) {
      this.errorName = '';
      this.errorLastName = '';
      this.errorAge = '';
      const formData: FormData = this.regisForm.value;
      this.formDataService.setFormData(formData)
      setTimeout(() => {
        this.router.navigate(['/step2']);
      }, 1000);
    } else {
      this.validation();
    }
  }

  clear() {
    this.regisForm.reset()
  }

  validation() {
    const firstnameControl = this.regisForm.controls['firstname'];
    const lastnameControl = this.regisForm.controls['lastname'];
    const ageControl = this.regisForm.controls['age'];

    if (firstnameControl.invalid) {
      if (firstnameControl.hasError('required')) {
        this.errorName = 'First name is a required field';
      } else if (firstnameControl.hasError('noNumbers')) {
        this.errorName = 'First name should not contain numbers';
      }
    }

    if (lastnameControl.invalid) {
      if (lastnameControl.hasError('required')) {
        this.errorLastName = 'Last name is a required field';
      } else if (lastnameControl.hasError('noNumbers')) {
        this.errorLastName = 'Last name should not contain numbers';
      }
    }

    if (ageControl.invalid) {
      if (ageControl.hasError('required')) {
        this.errorAge = 'Age must be a number';
      } else if (ageControl.hasError('pattern')) {
        this.errorAge = 'Age must be a number';
      } else if (ageControl.value <= 0) {
        this.errorAge = 'Age should be positive ';
      }
    }
  }
}
