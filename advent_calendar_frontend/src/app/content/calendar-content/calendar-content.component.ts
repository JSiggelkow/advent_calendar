import {Component, HostListener, Input} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-calendar-content',
  standalone: true,
  imports: [],
  templateUrl: './calendar-content.component.html',
  styleUrl: './calendar-content.component.scss'
})
export class CalendarContentComponent {
  @Input() doorNumber = '';

  constructor(private router: Router) {}

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

  closePopup() {
    this.router.navigate(['/'])
  }
}
