import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'ciorbica',
      'o reteta cu ciorbica',
      'https://savoriurbane.com/wp-content/uploads/2018/01/Ciorba-de-potroace-reteta-traditionala-savori-urbane.jpg'
    ),
    new Recipe(
      'strudel',
      'strudel ca la Anaconda',
      'https://www.culinar.ro/uploads/modules/news/0/2015/9/23/8411/fdb_1444083698_lead_800x600_8411.jpg'
    ),
  ];

  onRecipeClicked(selectedRecipe: Recipe) {
    this.recipeSelected.emit(selectedRecipe);
  }
}
