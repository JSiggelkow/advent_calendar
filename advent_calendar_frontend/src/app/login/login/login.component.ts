import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../../services/entities/Login.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;


  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }

  onLogin(): void {
    this.auth.login({username: this.username, password: this.password});
  }
}
