import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-door-access-forbidden',
  standalone: true,
  imports: [],
  templateUrl: './door-access-forbidden.component.html',
  styleUrl: './door-access-forbidden.component.scss'
})
export class DoorAccessForbiddenComponent {

  constructor(private router: Router) {
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const popupOverlay = document.querySelector('.popup-overlay');
    const header = document.querySelector('#header');
    if (
      (popupOverlay && popupOverlay.contains(event.target as Node)) ||
      (header && header.contains(event.target as Node))
    ) {
      return;
    }

    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/'])
  }

}
