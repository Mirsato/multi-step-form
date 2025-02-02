import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService, FormData } from '../service/form-data.service';

@Component({
  selector: 'app-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss']
})
export class NextStepComponent implements OnInit {
  regisForm!: FormGroup;
  errorPhone: string = '';
  errorEmail: string = '';

  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.secondStep();
    const formData = this.formDataService.getFormData()
    if(formData !== null) {
      this.regisForm.setValue({
        phone: formData?.phone,
        email: formData?.email
      })
    }
  }

  secondStep() {
    this.regisForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.regisForm.valid) {
      this.errorPhone = '';
      this.errorEmail = '';
      const formData: FormData = { ...this.formDataService.getFormData(), ...this.regisForm.value};
      this.formDataService.setFormData(formData)
      setTimeout(() => {
        this.router.navigate(['/last']);
      }, 1000);
    } else {
      this.validation();
    }
  }

  back() {
    this.router.navigate([''])
  }

  validation() {
    const phoneControl = this.regisForm.controls['phone'];
    const emailControl = this.regisForm.controls['email']

    if (phoneControl.invalid) {
      if (phoneControl.hasError('required')) {
        this.errorPhone = 'Phone number is a required field';
      }else if (phoneControl.hasError('pattern')) {
        this.errorPhone = 'Phone number should be number';
      }
    }

    if (emailControl.invalid) {
      if (emailControl.hasError('required')) {
        this.errorEmail = 'Email is a required field';
      }else if (emailControl.hasError('email')) {
        this.errorEmail = 'Email should have correct format';
      }
    }
  }
}
