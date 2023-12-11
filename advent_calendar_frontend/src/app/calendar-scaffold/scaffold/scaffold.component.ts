import { Component } from '@angular/core';
import {DoorComponent} from "../door/door.component";
import {NgForOf} from "@angular/common";
import {AdventCalendarDoor, AdventCalendarDoorService} from "../../services/entities/AdventCalendarDoor.service";

@Component({
  selector: 'app-scaffold',
  standalone: true,
  imports: [DoorComponent, NgForOf],
  templateUrl: './scaffold.component.html',
  styleUrl: './scaffold.component.scss'
})
export class ScaffoldComponent {
  adventCalendarDoors: AdventCalendarDoor[] | undefined = [];

  constructor(private adventCalendar: AdventCalendarDoorService) {
    this.adventCalendar.getAll('http://localhost:8080/api/calendar-doors')
      .subscribe(data => this.adventCalendarDoors = data);
  }
}
