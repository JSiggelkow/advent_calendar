import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {audit} from "rxjs";


export const loginGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  auth.isLoggedIn();

  let isLoggedIn = sessionStorage.getItem("loggedIn")

  if (isLoggedIn && isLoggedIn == "true") {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }


};
