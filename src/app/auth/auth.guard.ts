import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

export const authGuardFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store<fromApp.AppState>);

  return store.select('auth').pipe(
    take(1),
    map((authState) => authState.user),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
  );
};
