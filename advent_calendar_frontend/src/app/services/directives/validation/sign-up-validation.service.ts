import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, AsyncValidator } from "@angular/forms";
import { AuthService } from "../../entities/auth.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpValidationService {

  constructor(private auth: AuthService) { }

  ConfirmPasswordMatchesCreatePasswordValidator(createdPasswordControl: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isTheSame = createdPasswordControl.value != control.value;
      return isTheSame ? { noPasswordMatch: true } : null;
    }
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

