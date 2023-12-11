import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DoorContent, DoorContentService} from "../../services/entities/DoorContent.service";
import {JsonPipe} from "@angular/common";


@Component({
  selector: 'app-calendar-content',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './calendar-content.component.html',
  styleUrl: './calendar-content.component.scss'
})
export class CalendarContentComponent implements OnInit {
  @Input() doorNumber = '';
  doorContent: DoorContent | undefined;

  constructor(private router: Router, private doorContentService: DoorContentService) {
  }

  ngOnInit(): void {
    const doorNumberAsNumber = +this.doorNumber;
    if (!isNaN(doorNumberAsNumber) && doorNumberAsNumber > 0) {
      this.doorContentService.getById('http://localhost:8080/api/door-contents/validate', doorNumberAsNumber)
        .subscribe(
          data => this.doorContent = data,
          error => {
            if (error === null) {
              this.router.navigate(['/forbidden']);
            }
          }
        );
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const popupOverlay = document.querySelector('.popup-overlay');
    const header = document.querySelector('#header');
    if (
      (popupOverlay && popupOverlay.contains(event.target as Node)) ||
      (header && header.contains(event.target as Node))
    ) {
      console.log(this.doorContent)
      return;
    }

    this.router.navigate(['/']);
  }

  closePopup() {
    this.router.navigate(['/'])
  }
}
