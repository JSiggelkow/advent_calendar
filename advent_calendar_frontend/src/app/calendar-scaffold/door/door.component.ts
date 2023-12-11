import {Component, Input, OnInit} from '@angular/core';
import {state, style, transition, animate, trigger} from '@angular/animations';
import {Router, RouterLink, RouterOutlet} from "@angular/router";

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
  @Input() openDoorDate: String | undefined;
  isOpen = false;
  allowedToOpen = false;
  shakeAnimationState = 'start';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.openDoorDate != null) {
      this.allowedToOpen = Date.now() >= +this.openDoorDate;
    }
  }

  toggle() {
    if (!this.isOpen && this.allowedToOpen) {
      this.isOpen = true;

      setTimeout(() => {
        console.log(this.openDoorDate);
        this.router.navigate([this.doorNumber]);
      }, 600);
    } else {
      //start shake animation
      this.startShake();
    }
    return true;
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
