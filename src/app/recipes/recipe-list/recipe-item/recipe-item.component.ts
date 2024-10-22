import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor() {}
}
