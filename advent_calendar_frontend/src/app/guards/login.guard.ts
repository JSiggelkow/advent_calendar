import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  let isLoggedIn = sessionStorage.getItem("loggedIn")

  if (isLoggedIn && isLoggedIn == "true") {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
