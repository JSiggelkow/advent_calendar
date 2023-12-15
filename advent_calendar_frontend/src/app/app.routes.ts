import {Routes} from '@angular/router';
import {CalendarContentComponent} from "./content/calendar-content/calendar-content.component";
import {DoorAccessForbiddenComponent} from "./content/door-access-forbidden/door-access-forbidden.component";
import {LoginComponent} from "./login/login/login.component";
import {ScaffoldComponent} from "./calendar-scaffold/scaffold/scaffold.component";
import {loginGuard} from "./guards/login.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "advent-calendar",
    pathMatch: "full",
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'advent-calendar',
    component: ScaffoldComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'forbidden',
    component: DoorAccessForbiddenComponent
  },
  {
    path: ':doorNumber',
    component: CalendarContentComponent,
    canActivate: [loginGuard]
  },
];
