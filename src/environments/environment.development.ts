import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  firebaseApiKey: 'AIzaSyAy9187JjB_RoZB-QWrg26RWqUwLfyMYY4',
  imports: [StoreDevtoolsModule.instrument({ maxAge: 25 })],
};
