import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function ConfirmPasswordMatchesCreatePasswordValidator(createdPasswordControl: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isTheSame = createdPasswordControl.value != control.value;
    return isTheSame ? {noPasswordMatch: true} : null;
  }
}
