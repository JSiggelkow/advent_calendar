import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-door',
  standalone: true,
  imports: [],
  templateUrl: './door.component.html',
  styleUrl: './door.component.scss'
})
export class DoorComponent {
  @Input() doorNumber: number | undefined;
}
