import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../../services/entities/Login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  apiUrl: string = "http://localhost:8080/api/auth/login";

  constructor(private loginService: LoginService) {}

  onLogin(): void {
    this.loginService.create(this.apiUrl, {username: this.username, password: this.password}).subscribe(
      x => {
        if (x.accessToken) {
          sessionStorage.setItem("JWT", x.accessToken);
        } else {
          console.log("login failed")
        }
      }
    )
  }
}
