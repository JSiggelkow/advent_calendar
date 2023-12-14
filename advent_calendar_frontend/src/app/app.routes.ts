import {Routes} from '@angular/router';
import {CalendarContentComponent} from "./content/calendar-content/calendar-content.component";
import {DoorAccessForbiddenComponent} from "./content/door-access-forbidden/door-access-forbidden.component";
import {LoginComponent} from "./login/login/login.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forbidden',
    component: DoorAccessForbiddenComponent
  },
  {
    path: ':doorNumber',
    component: CalendarContentComponent
  },
];
