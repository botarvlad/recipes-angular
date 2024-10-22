import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app/store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './app/auth/store/auth.effects';
import { RecipeEffects } from './app/recipes/store/recipe.effects';
import { environment } from './environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      StoreModule.forRoot(appReducer),
      EffectsModule.forRoot([AuthEffects, RecipeEffects]),
      StoreRouterConnectingModule.forRoot(),
      environment.imports
    ),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
});
