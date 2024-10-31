import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [RouterOutlet, RecipeListComponent],
})
export class RecipesComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }
}
