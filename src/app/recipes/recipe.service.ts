import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     1,
  //     'ciorbica',
  //     'o reteta cu ciorbica',
  //     'https://savoriurbane.com/wp-content/uploads/2018/01/Ciorba-de-potroace-reteta-traditionala-savori-urbane.jpg',
  //     [new Ingredient('apa', 1), new Ingredient('carne de porcenstein', 2)]
  //   ),
  //   new Recipe(
  //     2,
  //     'strudel',
  //     'strudel ca la Anaconda',
  //     'https://www.culinar.ro/uploads/modules/news/0/2015/9/23/8411/fdb_1444083698_lead_800x600_8411.jpg',
  //     [new Ingredient('aluat', 1), new Ingredient('mar', 3)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

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
    // this.shoppingListService.addIngredients(ingredients);
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
