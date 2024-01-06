import {Component, inject, Input, OnInit} from '@angular/core';
import {state, style, transition, animate, trigger} from '@angular/animations';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {OpenedDoorsService} from "../../services/entities/opened-doors.service";

@Component({
  selector: 'app-door',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './door.component.html',
  styleUrl: './door.component.scss',
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'perspective(1200px) rotateY(0deg)',
        'transform-origin': 'left'
      })),
      state('open', style({
        transform: 'perspective(1200px) rotateY(-45deg)',
        'transform-origin': 'left'
      })),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('open => closed', [
        animate('0s')
      ]),
    ]),
    trigger('shake', [
      state('start', style({transform: 'translateX(0)'})),
      state('end', style({transform: 'translateX(-5px)'})),
      transition('start <=> end', [animate('100ms ease-in-out')]),
    ]),
  ],
})
export class DoorComponent implements OnInit {
  @Input() doorNumber: number | undefined;
  @Input() openDoorDate: string | undefined;
  @Input() getOpenedDoors: number[] | undefined;
  isOpen = false;
  allowedToOpen = false;
  shakeAnimationState = 'start';
  openedDoors = inject(OpenedDoorsService);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.openDoorDate != null) {
      this.allowedToOpen = Date.now() >= new Date(this.openDoorDate).getTime();
    }
    if (this.getOpenedDoors && this.doorNumber) {
      this.isOpen = this.getOpenedDoors.some(openedDoorNumber => openedDoorNumber === this.doorNumber);
    }
  }
  toggle(event: Event) {
    if (!this.isOpen && this.allowedToOpen && this.doorNumber) {
      this.isOpen = true;
      this.openedDoors.addDoor(this.doorNumber)

      setTimeout(() => {
        this.router.navigate(['advent-calendar', this.doorNumber]).then();
      }, 600);
    } else if (this.isOpen && this.allowedToOpen) {
      this.router.navigate(['advent-calendar', this.doorNumber]).then();
    } else {
      this.startShake();
    }
    event.stopPropagation();
  }

  startShake() {
    this.shakeAnimationState = 'start';
    setTimeout(() => {
      this.shakeAnimationState = 'end';
      setTimeout(() => {
        this.shakeAnimationState = 'start';
      }, 100);
    }, 0);
  }

}
