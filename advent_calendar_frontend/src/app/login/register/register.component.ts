import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {
  ConfirmPasswordMatchesCreatePasswordValidator
} from "../../services/directives/validation/confirm-password-matches-create-password.directive";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  router = inject(Router);
  constructor() {}

  signupForm = new FormGroup({
    createUsername: new FormControl('', Validators.required),
    createPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: ConfirmPasswordMatchesCreatePasswordValidator})

  onRegister() {
    console.log("register")
  }

  onNavigateToLogin() {
    this.router.navigate(["login"]).then();
  }

}
