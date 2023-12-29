import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const ConfirmPasswordMatchesCreatePasswordValidator: ValidatorFn = (
 control: AbstractControl,
): ValidationErrors | null => {
  const createdPassword = control.get('createPassword');
  const confirmPassword = control.get('confirmPassword');

  return createdPassword && confirmPassword && createdPassword.value != confirmPassword.value ? {ConfirmPasswordMatchesCreatePassword: true} : null;
}
