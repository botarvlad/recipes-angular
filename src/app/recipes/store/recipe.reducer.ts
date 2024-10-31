import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export const recipeReducer = createReducer(
  initialState,
  on(RecipesActions.setRecipes, (state, { payload }) => ({
    ...state,
    recipes: [...payload],
  })),
  on(RecipesActions.addRecipe, (state, { payload }) => ({
    ...state,
    recipes: [...state.recipes, payload],
  })),
  on(RecipesActions.updateRecipe, (state, { payload }) => {
    const recipeId = state.recipes.findIndex(
      (recipe) => recipe.id === payload.id
    );

    const updatedRecipe = {
      ...state.recipes[recipeId],
      ...payload.newRecipe,
    };

    const updatedRecipes = [...state.recipes];
    updatedRecipes[recipeId] = updatedRecipe;

    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(RecipesActions.deleteRecipe, (state, { payload }) => ({
    ...state,
    recipes: state.recipes.filter((recipe) => recipe.id !== payload),
  }))
);
