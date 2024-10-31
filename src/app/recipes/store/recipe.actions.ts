import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const setRecipes = createAction(
  '[Recipes] Set Recipes',
  props<{ payload: Recipe[] }>()
);
export const fetchRecipes = createAction('[Recipes] Fetch Recipes');
export const addRecipe = createAction(
  '[Recipes] Add Recipe',
  props<{ payload: Recipe }>()
);
export const updateRecipe = createAction(
  '[Recipes] Update Recipe',
  props<{ payload: { id: number; newRecipe: Recipe } }>()
);
export const deleteRecipe = createAction(
  '[Recipes] Delete Recipe',
  props<{ payload: number }>()
);
