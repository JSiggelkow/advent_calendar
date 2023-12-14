import { Component } from '@angular/core';
import {AuthService} from "../../services/http/auth.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

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

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Erfolgreich eingeloggt!', response);

      },
      (error) => {
        console.error('Fehler beim Login:', error);
      }
    );
  }
}
