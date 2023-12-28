import {Routes} from '@angular/router';
import {CalendarContentComponent} from "./content/calendar-content/calendar-content.component";
import {DoorAccessForbiddenComponent} from "./content/door-access-forbidden/door-access-forbidden.component";
import {LoginComponent} from "./login/login/login.component";
import {ScaffoldComponent} from "./calendar-scaffold/scaffold/scaffold.component";
import {loginGuard} from "./guards/login.guard";
import {RegisterComponent} from "./login/register/register.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "advent-calendar",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'advent-calendar',
    component: ScaffoldComponent,
    canActivate: [loginGuard],
    children: [
      {
        path: ':doorNumber',
        component: CalendarContentComponent,
        canActivate: [loginGuard]
      }
    ]
  },
  {
    path: 'forbidden',
    component: DoorAccessForbiddenComponent
  },
];
