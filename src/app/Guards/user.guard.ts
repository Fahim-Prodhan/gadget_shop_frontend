import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService)
  const router = inject(Router)

  if(login.isLoggedIn() == true && login.getUserRole()=="NORMAL"){
    return true
  }

  login.logout()
  router.navigate(['login'])
  return false;
};
