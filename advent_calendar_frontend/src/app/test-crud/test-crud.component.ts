import {Component, OnInit} from '@angular/core';
import {AdventCalendarDoor, AdventCalendarDoorService} from "../services/entities/AdventCalendarDoor.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-test-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-crud.component.html',
  styleUrl: './test-crud.component.scss'
})
export class TestCrudComponent implements OnInit{

  adventCalendarDoors: AdventCalendarDoor[] | undefined = [];

  constructor(private adventCalendar: AdventCalendarDoorService) {
  }

  ngOnInit(): void {
    this.adventCalendar.getAll('http://localhost:8080/api/calendar-doors')
      .subscribe(data => this.adventCalendarDoors = data);
  }



}
