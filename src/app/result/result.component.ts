import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../service/form-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit{
  firstname: string = '';
  lastname: string = '';
  age: string = ''
  phone: string = ''
  email: string = ''
  seat: string = ''
  food: string = ''
  allergies: string = ''

  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.formDataService.getFormData()
    this.result()
  }

  result() {
    this.firstname = this.formDataService.getFormData()?.firstname!
    this.lastname = this.formDataService.getFormData()?.lastname!
    this.age = this.formDataService.getFormData()?.age!
    this.phone = this.formDataService.getFormData()?.phone!
    this.email = this.formDataService.getFormData()?.email!
    this.seat = this.formDataService.getFormData()?.seat!
    this.food = this.formDataService.getFormData()?.food!
    this.allergies = this.formDataService.getFormData()?.allergies!
  }

  back() {
    this.router.navigate(['/last'])
  }

}
