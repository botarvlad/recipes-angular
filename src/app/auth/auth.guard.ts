import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuardFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
  );
};
