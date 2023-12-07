import { Component } from '@angular/core';
import {DoorComponent} from "../door/door.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-scaffold',
  standalone: true,
  imports: [DoorComponent, NgForOf],
  templateUrl: './scaffold.component.html',
  styleUrl: './scaffold.component.scss'
})
export class ScaffoldComponent {
  doors: number[] = [];

  constructor() {
    this.doors = Array.from({length:24},(_, index) => index +1);
  }
}
