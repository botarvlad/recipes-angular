import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'ciorbica',
      'o reteta cu ciorbica',
      'https://savoriurbane.com/wp-content/uploads/2018/01/Ciorba-de-potroace-reteta-traditionala-savori-urbane.jpg',
      [new Ingredient('apa', 1), new Ingredient('carne de porcenstein', 2)]
    ),
    new Recipe(
      'strudel',
      'strudel ca la Anaconda',
      'https://www.culinar.ro/uploads/modules/news/0/2015/9/23/8411/fdb_1444083698_lead_800x600_8411.jpg',
      [new Ingredient('aluat', 1), new Ingredient('mar', 3)]
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
