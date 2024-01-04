import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/entities/auth.service";
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
  router = inject(Router);

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn$.subscribe(x => {
      this.isLoggedIn = x;
    });
    if (sessionStorage.getItem("loggedIn") == "true") {
      this.isLoggedIn = true;
    }
  }


  logout() {
    this.auth.logout();
    this.router.navigate(["login"]).then();
  }
}
