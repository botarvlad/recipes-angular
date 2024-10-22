import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  imports: [ShoppingListComponent, ShoppingEditComponent, AsyncPipe, NgFor],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private igChanged: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChanged = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.igChanged.unsubscribe();
  }
}
