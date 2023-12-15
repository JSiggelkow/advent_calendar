import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onLogin(): void {
    this.auth.login({username: this.username, password: this.password});
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.router.navigate(["advent-calendar"]);
      }
    })
  }
}
