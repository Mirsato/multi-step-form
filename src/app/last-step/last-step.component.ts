import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService, FormData } from '../service/form-data.service';

@Component({
  selector: 'app-last-step',
  templateUrl: './last-step.component.html',
  styleUrls: ['./last-step.component.scss']
})
export class LastStepComponent implements OnInit {
  regisForm!: FormGroup;
  errorName: string = '';


  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataService) {}

  ngOnInit(): void {
    
    this.lastStep();
    const formData = this.formDataService.getFormData()
    if(formData!== null) {
      this.regisForm.setValue({
        seat: formData?.seat,
        food: formData?.food,
        allergies: formData?.allergies
      })
    }
  }

  lastStep() {
    this.regisForm = this.fb.group({
      seat: ['', [Validators.required]],
      food: ['', [Validators.required]],
      allergies: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.regisForm.valid) {
      this.errorName = '';
      const formData: FormData = { ...this.formDataService.getFormData(), ...this.regisForm.value};
      this.formDataService.setFormData(formData)
      this.router.navigate(['/result'])
      // this.result()
    } else {
      this.validation();
    }
  }

  back() {
    this.router.navigate(['/step2'])
  }

  validation() {
    const seatControl = this.regisForm.controls['seat'];
    const foodControl = this.regisForm.controls['food'];
    const allergiesControl = this.regisForm.controls['allergies']

    if (seatControl.invalid) {
      if (seatControl.hasError('required')) {
        this.errorName = 'Seat is a required field';
      }
    }

    if (foodControl.invalid) {
      if (foodControl.hasError('required')) {
        this.errorName = 'Food is a required field';
      }
    }

    if (allergiesControl.invalid) {
      if (allergiesControl.hasError('required')) {
        this.errorName = 'Allergies is a required field';
      }
    }
  }
}
