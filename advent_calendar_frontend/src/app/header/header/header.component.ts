import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn$.subscribe(x => {
      this.isLoggedIn = x;
    })
  }


  logout() {
    this.auth.logout();
  }
}
