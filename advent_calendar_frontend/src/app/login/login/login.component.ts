import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/entities/auth.service";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../../services/http/errorHandling.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, AfterViewInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  loginError: boolean = false;


  constructor(private auth: AuthService, private router: Router, private errorHandling: ErrorHandlingService) {
  }

  ngAfterViewInit(): void {
    const inputUsername = document.getElementById('username');
    const inputPassword = document.getElementById('password');
    const button = document.getElementById('loginButton');

    setTimeout(() => {
      if (inputUsername && inputPassword && button && inputUsername.matches(':-internal-autofill-selected') && inputPassword.matches(':-internal-autofill-selected')) {
        button.classList.add('btn-enabled');
        button.classList.remove('btn-disabled');
      }
    }, 20);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("loggedIn") == "true") {
      this.auth.logout();
    }
  }

  onLogin(): void {
    this.auth.login({username: this.username, password: this.password});
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
  }

  onNavigateToRegister() {
    this.router.navigate(["signUp"]).then();
  }
}
