//creating a class
class RecipeCollection {
//initialise the current value and define recipe array for maintaining list of recipes
    constructor(currentId = 0) {
    this.recipe = [];
    this.id = currentId;
    }
  //method to add recipe 
  addRecipe(recipeName, dishType, PrepTime, serving, difficulty, ingredients) {
    let recipeItem = {
      id: this.id++,
      recipeName: recipeName,
      dishType: dishType,
      PrepTime: PrepTime,
      serving: serving,
      difficulty: difficulty,
      ingredients: ingredients
    };
    //adding item to recipe array
    this.recipe.push(recipeItem);
  }
  
  //delete task by passing id
  deletecurrentRecipe(passingID) {
    //looping over the recipes
    for (let i = 0; i < this.recipe.length; i++) {
      const currentRecipe = this.recipe[i];
      if (currentRecipe.id === passingID) {
        this.recipe.splice(i, 1);
      }
    }
  }

  save() {
    // Create a JSON string of the recipes
    const recipesJson = JSON.stringify(this.recipe);
    // Store the JSON string in localStorage
    localStorage.setItem("recipe", recipesJson);
    // Convert the currentId to a string;
    const currentId = String(this.id);
    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  load() {
    // Check if any recipes are saved in localStorage
    if (localStorage.getItem("recipe")) {
      // Get the JSON string of recipes in localStorage
      const recipesJson = localStorage.getItem("recipe");
      // Convert it to an array and store it in our recipeCollection
      this.recipe = JSON.parse(recipesJson);
    }
    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");
      // Convert the currentId to a number and store it in our recipeCollection
      this.id = Number(currentId);
    }
  }
}

