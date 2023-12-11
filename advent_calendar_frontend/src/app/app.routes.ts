import {Routes} from '@angular/router';
import {CalendarContentComponent} from "./content/calendar-content/calendar-content.component";
import {DoorAccessForbiddenComponent} from "./content/door-access-forbidden/door-access-forbidden.component";

export const routes: Routes = [
  {
    path: 'forbidden',
    component: DoorAccessForbiddenComponent
  },
  {
    path: ':doorNumber',
    component: CalendarContentComponent
  },
];
