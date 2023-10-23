import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  /**
   * Check Error status for a form control
   * @param form  FormGroup
   * @param control string to check
   * @returns boolean 
   */
  checkError(form: FormGroup, control:string) {
    debugger;
    return form.get(control)?.invalid && (form.get(control)?.dirty || form.get(control)?.touched)
  }
}
