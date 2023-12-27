import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(auth: AuthService) {
    auth.isLoggedIn$.subscribe(x => {
      this.isLoggedIn = x;
    })
  }
}
