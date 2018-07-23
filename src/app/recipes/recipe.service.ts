import {Recipe} from '../shared/recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from "rxjs/internal/Subject";

@Injectable(/*{providedIn: 'root'}*/)
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Gyros', 'Greek meal',
      'https://www.realgreekrecipes.com/wp-content/uploads/2017/12/Gyros-Recipe-1.jpg', [
        new Ingredient('salad', 5),
        new Ingredient('meat', 1)
      ]),
    new Recipe('Thanksgiving meal for everyone!', 'I\'ve got ....',
      'https://i.ytimg.com/vi/-8H2vIUf-G8/0.jpg', [
        new Ingredient('greens', 1),
        new Ingredient('beans', 1),
        new Ingredient('tomatoes', 2),
        new Ingredient('you name it', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService){}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); // only returns the copy not the actual reference.
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
