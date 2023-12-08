import {Component, Input} from '@angular/core';
import {state, style, transition,animate, trigger} from '@angular/animations';

@Component({
  selector: 'app-door',
  standalone: true,
  imports: [],
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
  ],
})
export class DoorComponent {
  @Input() doorNumber: number | undefined;
  isOpen = false;

  toggle() {
    if (!this.isOpen) {
      this.isOpen = true;
    }
  }
}
