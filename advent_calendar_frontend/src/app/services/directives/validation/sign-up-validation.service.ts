import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../../entities/auth.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpValidationService {

  constructor(private auth: AuthService) { }

  confirmPasswordMatchesCreatePassword: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const createdPassword = control.get('createPassword');
    const confirmedPassword = control.get('confirmPassword');

    return createdPassword && confirmedPassword && createdPassword.value != confirmedPassword.value ? {passwordsNotMatch: true} : null;
  }

  UniqueUsernameValidator(): (control: AbstractControl) => (Promise<ValidationErrors | null> | Observable<ValidationErrors | null>) {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return this.auth.checkUsername(control.value).pipe(
        map((exists: boolean) => (exists ? { usernameTaken: true } : null)),
        catchError(async () => null)
      );
    };
  }
}

