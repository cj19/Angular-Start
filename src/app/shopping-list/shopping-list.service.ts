import {Ingredient} from '../shared/ingredient.model';
import {Subject} from "rxjs/internal/Subject";

export class ShoppingListService {

  ingredientChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] =
    [new Ingredient('Apples', 5),
      new Ingredient('Greens', 10),
      new Ingredient('Tomatoes', 7)];

  getIngredients() {
    return this.ingredients.slice(); // get the copy only... not the actual ref
  }

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    if (this.contains(ingredient)){
      this.updateExistingIngredient(ingredient);
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientChanged.next(this.getIngredients().slice());
  }

  private updateExistingIngredient(ingredient: Ingredient) {
    for (const actualIngredient of this.ingredients) {
      if (actualIngredient.name.toLowerCase() === ingredient.name.toLowerCase()) {
        actualIngredient.amount += ingredient.amount;
      }
    }
  }

  updateIngredientByIndex(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.addAmountsToIngredients(newIngredients);
    this.sortNewIngredients(newIngredients);

    // this.ingredients.push(...otherIngredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  private addAmountsToIngredients(newIngredients: Ingredient[]) {
    for (const ingredient of this.ingredients) {
      for (const newIngredient of newIngredients) {
        if (ingredient.name.toLowerCase() === newIngredient.name.toLowerCase()) {
          ingredient.amount += newIngredient.amount;
        }
      }
    }
  }

  private sortNewIngredients(newIngredients: Ingredient[]) {
    const otherIngredients: Ingredient[] = [];
    for (const actualIngredient of newIngredients) {
      if (!this.contains(actualIngredient)) {
        otherIngredients.push(new Ingredient(this.capitalizeFirstLetter(actualIngredient.name), actualIngredient.amount));
      }
    }
    this.ingredients.push(...otherIngredients);
  }

  contains(actualIngredient: Ingredient) {
    let contain = false;
    for (const ingredient of this.ingredients) {
      if (ingredient.name.toLowerCase() === actualIngredient.name.toLowerCase()) {
          contain = true;
      }
    }
    return contain;
  }

  private capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  deleteIngredientByIndex(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

