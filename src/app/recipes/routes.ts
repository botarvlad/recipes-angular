import { Routes } from '@angular/router';
import { authGuardFn } from '../auth/auth.guard';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';

export const RECIPE_ROUTES: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        component: NoRecipeSelectedComponent,
      },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];
