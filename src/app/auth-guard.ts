import { CanActivateFn, Router } from '@angular/router';
import { AuthGooleService } from './auth-goole-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthGooleService = inject(AuthGooleService);
  const router: Router = inject(Router);
  const loggedProfile = authService.getLoggedProfile();

  if (loggedProfile) return true;
  else {
    router.navigate(['']);
    return false;
  }
};
