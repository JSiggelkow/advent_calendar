import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {AuthService} from "../../entities/auth.service";
import {catchError, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.auth.checkUsername(control.value).pipe(
      map((exists: boolean) => (exists ? { usernameTaken: true } : null)),
      catchError(async () => null)
    );
  }
}
