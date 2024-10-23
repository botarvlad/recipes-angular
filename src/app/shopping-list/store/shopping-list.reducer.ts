import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState = {
  ingredients: [new Ingredient('patrunjel', 1), new Ingredient('oua', 1)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, payload],
  })),
  on(ShoppingListActions.addIngredients, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, ...payload],
  })),
  on(ShoppingListActions.updateIngredient, (state, { payload }) => {
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = { ...ingredient, ...payload };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredientIndex: -1,
      editedIngredient: null,
    };
  }),
  on(ShoppingListActions.deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter(
      (ingredient, index) => index !== state.editedIngredientIndex
    ),
    editedIngredient: null,
    editedIngredientIndex: -1,
  })),
  on(ShoppingListActions.startEdit, (state, { payload }) => ({
    ...state,
    editedIngredientIndex: payload,
    editedIngredient: { ...state.ingredients[payload] },
  })),
  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
  }))
);
