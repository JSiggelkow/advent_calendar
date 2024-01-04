import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {SignUpValidationService} from "../../services/directives/validation/sign-up-validation.service";

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
  customValidation = inject(SignUpValidationService);
  hide = true;
  constructor() {}

  createUsername = new FormControl('', {
    validators: [Validators.required],
    asyncValidators: [this.customValidation.UniqueUsernameValidator().bind(this.customValidation.UniqueUsernameValidator)],
    updateOn: 'blur',
  });

  createPassword = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(4),
    ],
    updateOn: "change"
  });

  confirmPassword = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(4),
    ],
    updateOn: "change"
  });

  signupForm = new FormGroup({
    createUsername: this.createUsername,
    createPassword: this.createPassword,
    confirmPassword: this.confirmPassword
  }, {validators: this.customValidation.confirmPasswordMatchesCreatePassword});

  onRegister() {
    if (this.signupForm.invalid) {
      return
    }
    console.log("register")
  }

  onNavigateToLogin() {
    this.router.navigate(["login"]).then();
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError("usernameTaken")) {
      return "Username already exists"
    } else if (formControl.hasError("required")) {
      return "You must enter a value"
    } else if (formControl.hasError("minlength")) {
      return "Password is to short"
    } else if (this.signupForm.hasError("passwordsNotMatch")) {
      return "Passwords do not match"
    }
    return "An error occurred"
  }
}
