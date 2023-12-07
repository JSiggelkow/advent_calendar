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
    this.doors = this.shuffleArray(Array.from({ length: 24 }, (_, index) => index + 1));
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
