import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {SignUpValidationService} from "../../services/directives/validation/sign-up-validation.service";
import {AuthService} from "../../services/entities/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  router = inject(Router);
  auth = inject(AuthService);
  customValidation = inject(SignUpValidationService);
  hide = true;

  constructor() {
  }

  createUsername = new FormControl('', {
    validators: [
      Validators.required,
      this.customValidation.customPatternValidator(new RegExp("^\\S+$"), "whitespace"),
      this.customValidation.customPatternValidator(new RegExp("^[a-zA-Z0-9_]+$"), "onlyLettersNumbersUnderscore")
    ],
    asyncValidators: [this.customValidation.UniqueUsernameValidator().bind(this.customValidation.UniqueUsernameValidator)],
    updateOn: 'blur',
  });

  createPassword = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(4),
      this.customValidation.customPatternValidator(new RegExp("^\\S+$"), "whitespace"),
      this.customValidation.customPatternValidator(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?/~\\\\-]*$"), "forbiddenCharacter")
    ],
    updateOn: "change"
  });

  confirmPassword = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(4),
      this.customValidation.customPatternValidator(new RegExp("^\\S+$"), "whitespace"),
      this.customValidation.customPatternValidator(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?/~\\\\-]*$"), "forbiddenCharacter")
    ],
    updateOn: "change"
  });

  signupForm = new FormGroup({
    createUsername: this.createUsername,
    createPassword: this.createPassword,
    confirmPassword: this.confirmPassword
  }, {validators: this.customValidation.confirmPasswordMatchesCreatePassword});

  onSignUp() {
    if (this.signupForm.invalid) {
      return
    }
    if (this.createUsername.value && this.createPassword.value) {
      this.auth.signUp({username: this.createUsername.value, password: this.createPassword.value});
    } else {
      return;
    }
  }

  onNavigateToLogin() {
    this.router.navigate(["login"]).then();
  }

  getErrorMessage(formControl: FormControl) {
    const errorType = formControl.errors ? Object.keys(formControl.errors)[0] : null;

    switch (errorType) {
      case "usernameTaken":
        return "Username already exists";
      case "required":
        return "You must enter a value";
      case "minlength":
        return "Password is too short";
      case "whitespace":
        return "Whitespace not allowed";
      case "onlyLettersNumbersUnderscore":
        return "Invalid characters"
      case "forbiddenCharacter":
        return "Forbidden Character"
      default:
        return "An error occurred";
    }
  }
}
