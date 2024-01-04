import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/entities/auth.service";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../../services/http/errorHandling.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SignUpValidationService} from "../../services/directives/validation/sign-up-validation.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, AfterViewInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  loginError: boolean = false;
  hide: boolean = true;
  customValidation = inject(SignUpValidationService);
  autofill: boolean = false;



  constructor(private auth: AuthService, private router: Router, private errorHandling: ErrorHandlingService) {
  }

  ngAfterViewInit(): void {
    const inputUsername = document.getElementById('usernameForm');
    const inputPassword = document.getElementById('passwordForm');
    const button = document.getElementById('loginButton');

    setTimeout(() => {
      if (inputUsername && inputPassword && button && inputUsername.matches(':-internal-autofill-selected') && inputPassword.matches(':-internal-autofill-selected')) {
        button.classList.add("enabled");
        button.classList.remove("disabled")
      }
    }, 20);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("loggedIn") == "true") {
      this.auth.logout();
    }
  }

  usernameControl = new FormControl('', {
      validators: [
        Validators.required,
        this.customValidation.customPatternValidator(new RegExp("^\\S+$"), "whitespace"),
        this.customValidation.customPatternValidator(new RegExp("^[a-zA-Z0-9_]+$"), "onlyLettersNumbersUnderscore")
      ],
      updateOn: "change",
    }
  );

  passwordControl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        this.customValidation.customPatternValidator(new RegExp("^\\S+$"), "whitespace"),
        this.customValidation.customPatternValidator(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?/~\\\\-]*$"), "forbiddenCharacter")
      ],
      updateOn: "change",
    }
  );

  loginForm = new FormGroup({
    usernameControl: this.usernameControl,
    passwordControl: this.passwordControl
  }, {})

  onLogin(): void {
    if (this.loginForm.invalid) {
      return
    }
    if (this.usernameControl.valid && this.passwordControl.valid && this.usernameControl.value && this.passwordControl.value) {
      this.auth.login({username: this.usernameControl.value, password: this.passwordControl.value});
      this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (this.isLoggedIn) {
          this.router.navigate(["advent-calendar"]).then();
        }
      });
      this.errorHandling.errorCode$.subscribe(errorStatus => {
        if (errorStatus === 403) {
          this.loginError = true;
        }
      })
    } else {
      return;
    }

  }

  onNavigateToRegister() {
    this.router.navigate(["signUp"]).then();
  }

  getErrorMessage(formControl: FormControl) {
    const errorType = formControl.errors ? Object.keys(formControl.errors)[0] : null;

    switch (errorType) {
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
