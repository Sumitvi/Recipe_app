let RecipeContainer = document.querySelector(".recipe-container");
let btn = document.querySelector(".btn");
let inp = document.querySelector(".inp");
let heading = document.querySelector(".heading");
let recipeCloseBtn=document.querySelector(".recipe-close-btn")

let RecipeDetailsContent = document.querySelector(".recipe-details-content");

async function FetchRecipe(query){
    // RecipeContainer.innerHTML="Fetching Recipes...";
    try{
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let response= await data.json();

    console.log(response);

    heading.innerHTML= " ";
    heading.style.display="none";
  
    response.meals.forEach(meal => {
        // console.log(meal);
        let RecipeDiv = document.createElement("div");
        RecipeDiv.classList.add("recipe");
        RecipeDiv.innerHTML=`<img src = "${meal.strMealThumb}"> 
        
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span></p>
        

        `;
        const button = document.createElement("button");
        button.textContent="View Recipe";
        RecipeDiv.appendChild(button);

        // Adding Eventlistner to cards button

        button.addEventListener("click",()=>{
            openRecipePopup(meal);
        })

        
       
        RecipeContainer.appendChild(RecipeDiv);
        
    });
}catch(error){
    console.log("Error");
    
}

}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let InputValue= inp.value.trim();
    FetchRecipe(InputValue);
    // console.log("clicked");
})

let openRecipePopup =(meal)=>{
    RecipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ingredients">Ingredents: </h3>
    <ul class="recipeList">${fetchIngredients(meal)}</ul>
    <div>
        <h3 class="instructionHeading">Instructions :</h3>
        <p class="RecipeInstruction">${meal.strInstructions}</p>
    </div>
    
    `
    
    RecipeDetailsContent.parentElement.style.display="block";
}

// function to factch ingredients and measurements
let fetchIngredients=(meal)=>{
    let ingredientList = " ";

    for(let i =1 ;i<20;i++){
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientList += ` <li>${measure} ${ingredients}</li>`;
        }else{
            break;
        }
    }
    return ingredientList;
}


recipeCloseBtn.addEventListener("click",()=>{
    RecipeDetailsContent.parentElement.style.display="none";
})
