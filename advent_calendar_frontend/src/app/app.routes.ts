import {Routes} from '@angular/router';
import {CalendarContentComponent} from "./content/calendar-content/calendar-content.component";

export const routes: Routes = [
  {
    path: ':doorNumber',
    component: CalendarContentComponent
  }
];
