import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

export const adminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const login = inject(LoginService)
  const router = inject(Router)

  if(login.isLoggedIn() == true && login.getUserRole()=="ADMIN"){
    return true
  }

  login.logout()
  router.navigate(['login'])
  return false;
};
