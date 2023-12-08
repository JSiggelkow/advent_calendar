import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-calendar-content',
  standalone: true,
  imports: [],
  templateUrl: './calendar-content.component.html',
  styleUrl: './calendar-content.component.scss'
})
export class CalendarContentComponent{
    @Input() doorNumber = '';

}
