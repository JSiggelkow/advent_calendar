import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SignUpValidationService {

  ConfirmPasswordMatchesCreatePasswordValidator(createdPasswordControl: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isTheSame = createdPasswordControl.value != control.value;
      return isTheSame ? {noPasswordMatch: true} : null;
    }
  }

  constructor() { }
}
