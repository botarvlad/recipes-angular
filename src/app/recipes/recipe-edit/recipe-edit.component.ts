import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { debounceTime, map, Subscription } from 'rxjs';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  id: number;
  editMode: boolean = false;
  imagePreviewUrl: string = '';
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.recipeForm
      .get('imagePath')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((newImagePath) => {
        this.imagePreviewUrl = newImagePath;
      });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, {
      //   ...this.recipeForm.value,
      //   id: this.id,
      // });
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          id: this.id,
          newRecipe: {
            ...this.recipeForm.value,
            id: this.id,
          },
        })
      );
    } else {
      // this.recipeService.addRecipe({
      //   ...this.recipeForm.value,
      //   id: this.recipeService.getNextId(),
      // });
      this.store.dispatch(
        new RecipeActions.AddRecipe({
          ...this.recipeForm.value,
          id: this.recipeService.getNextId(),
        })
      );
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map((recipesState) => {
            return recipesState.recipes.find((recipe) => {
              return recipe.id === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });

    this.imagePreviewUrl = this.recipeForm.get('imagePath')?.value || '';
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
