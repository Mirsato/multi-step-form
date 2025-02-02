import { Injectable } from '@angular/core';

export interface FormData {
  firstname?: string;
  lastname?: string;
  age?: string;
  phone?: string;
  email?: string;
  seat?: string;
  food?: string;
  allergies?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FormDataService {
  private formData: FormData | null = null;

  constructor() { }

  setFormData(data: FormData): void {
    this.formData = { ...this.formData, ...data }
  }

  // Get form data
  getFormData(): FormData | null {
    return this.formData; 
  }

  
}
