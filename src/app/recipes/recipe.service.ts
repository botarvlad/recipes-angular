import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next([...this.recipes]);
  }

  getNextId(): number {
    return this.recipes.length + 1;
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipe(id: number) {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id === id);
    this.recipes[recipeIndex] = newRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(id: number) {
    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id === id);
    this.recipes.splice(recipeIndex, 1);
    this.recipesChanged.next([...this.recipes]);
  }
}
