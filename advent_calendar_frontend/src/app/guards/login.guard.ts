import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {audit} from "rxjs";


export const loginGuard: CanActivateFn = (route, state) => {

  console.log(route.toString())
  console.log(state.toString())

  const router = inject(Router);


  let isLoggedIn = sessionStorage.getItem("loggedIn")

  if (isLoggedIn && isLoggedIn == "true") {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
