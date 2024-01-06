import {Component, inject, OnInit} from '@angular/core';
import {DoorComponent} from "../door/door.component";
import {NgForOf} from "@angular/common";
import {AdventCalendarDoor, AdventCalendarDoorService} from "../../services/entities/AdventCalendarDoor.service";
import {RouterOutlet} from "@angular/router";
import {OpenedDoorsService} from "../../services/entities/opened-doors.service";

@Component({
  selector: 'app-scaffold',
  standalone: true,
  imports: [DoorComponent, NgForOf, RouterOutlet],
  templateUrl: './scaffold.component.html',
  styleUrl: './scaffold.component.scss'
})
export class ScaffoldComponent implements OnInit {

  openedDoorsService = inject(OpenedDoorsService);

  adventCalendarDoors: AdventCalendarDoor[] | undefined = [];
  openedDoors: number[] = [];

  constructor(private adventCalendar: AdventCalendarDoorService) {
    this.adventCalendar.getAll('http://localhost:8080/api/calendar-doors')
      .subscribe(data => this.adventCalendarDoors = data);
  }

  ngOnInit(): void {
    this.openedDoorsService.getDoors().subscribe({
      next: value => {
        this.openedDoors = value;
      },
      error: () => {
        console.log("error getting doors");
      }
    });
  }
}
