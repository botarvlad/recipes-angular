import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.recipeId = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipe) => {
            return recipe.id === this.recipeId;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipeId);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeId));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
