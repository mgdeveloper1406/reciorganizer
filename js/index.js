//Initialize new recipe collection with current id set to 0
const recipeCollection = new RecipeCollection(0);
recipeCollection.load();
console.log(recipeCollection.recipe);

//Select form in the modal
let mainform = document.querySelector("#mainform");
//Select buttons
const btnclear = document.querySelector("#btnClear");
const btnAddRecipe = document.querySelector("#btnAddRecipe");
const btnClose = document.querySelector("#btnClose");
//Select inputs
const recipeId = document.querySelector("#recipeId"); //hidden value having task id
const idRecipeName = document.querySelector("#idRecipeName");
const idPrepTime = document.querySelector("#idPrepTime");
const idServings = document.querySelector("#idServings");
const idIngredients = document.querySelector("#idIngredients");
const idDishType = document.getElementById("idDishType");
let idDishTypeValue = idDishType.options[idDishType.selectedIndex].value;

let cardParent = document.querySelector("#idCard");

// Function to get radio button value
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    console.log(radios.value);
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { 
            val = radios[i].value; 
            break; 
        }
    }
    return val; 
}

//Getting values from the form and adding to recipe collection
const addToRecipeLst = () => {
    
    idDishTypeValue = idDishType.options[idDishType.selectedIndex].value;
    idDifficulty = getRadioVal( document.getElementById('mainform'), 'difficulty' );
   
    recipeCollection.addRecipe(
        idRecipeName.value,
        idDishTypeValue,
        idPrepTime.value,
        idServings.value,
        idDifficulty,
        idIngredients.value
    );
        
    addRecipeItemsToBody();
    clearFormValues();

    $("#exampleModal").trigger("click"); // for closing modal
  
};

//Onclick event to add recipe items
btnAddRecipe.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  addToRecipeLst();
  recipeCollection.save();

  console.log(recipeCollection.recipe);
});

//Creating cards for each task in the taskmanager
const addHtmlForm = (recipeItem) => {
  return `
  <div class="card border-dark mycardclass col-md-4" style="width:20rem;height:22rem">
    <div class="card-body">
        <h5>${recipeItem.recipeName}</h5><br />
        <p class="card-text">Dish Type: ${recipeItem.dishType}</p>
        <p class="card-text">Preparation Time: ${recipeItem.PrepTime}</p>
        <p class="card-text">No. of Servings: ${recipeItem.serving}</p>
        <p class="card-text ">Difficulty: ${recipeItem.difficulty}</p>
        <p class="card-text ">Ingredients: ${recipeItem.ingredients}</p>
        <div class="d-flex flex-row justify-content-end ">
        <button class="btn"  value="Delete" name="${recipeItem.id}" onclick="deletingDataModal(${recipeItem.id})"  title="Delete Task"><span style='font-size:1.2rem;'>&#128465</span></button>
       </div>
    </div>
  </div>
  `;
};

//Add recipe collection's recipe to the html body
function addRecipeItemsToBody() {

  let htmlCardDisplay = "";

  for (let j = 0; j < recipeCollection.recipe.length; j++) {
    htmlCardDisplay += addHtmlForm(recipeCollection.recipe[j]);
  }
  
  cardParent.innerHTML = htmlCardDisplay;
}

//this condition loads data from local storage
if (recipeCollection.recipe.length > 0) {
  addRecipeItemsToBody();
}

//Clear input fields in modal
clearFormValues = () => {
 idRecipeName.value = "";
 idDishTypeValue.selectedIndex = 0,
 idPrepTime.value = "";
 idServings.value = "";
 idIngredients.value = "";
};

//Onclick event for clearing form
btnClear.addEventListener("click", (event) => {
  clearFormValues();
  event.preventDefault();
  event.stopPropagation();
});

//Function to delete task details onclick of delete button
function deletingDataModal(recipeID) {
  recipeId.value = recipeCollection.deletecurrentRecipe(recipeID);
  recipeCollection.deletecurrentRecipe(recipeID);
  recipeCollection.save();
  clearFormValues();
  addRecipeItemsToBody();
  console.log(recipeCollection.recipe);
}

//Onclick event modal closes and clearing form
btnClose.addEventListener("click", () => {
  clearFormValues();
  $("#exampleModal").trigger("click"); 
});
