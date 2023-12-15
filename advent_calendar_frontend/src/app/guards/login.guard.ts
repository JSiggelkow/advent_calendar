import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";


export const loginGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  auth.isLoggedIn();
  let isLoggedIn = false;

  auth.isLoggedIn$.subscribe(x => {
    isLoggedIn = x;
    console.log(isLoggedIn);
  })


  if (!isLoggedIn){
    router.navigate(["login"]);
    return false;
  }

  return true;

};
