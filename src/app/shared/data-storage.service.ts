import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "./recipe.model";
import {map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getTokenId();
    return this.http.put('https://ng-course-project-5ca89.firebaseio.com/recipe.json?auth='+token,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getTokenId();

    return this.http.get('https://ng-course-project-5ca89.firebaseio.com/recipe.json?auth='+token)
      .pipe(map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
