//Import the function that loads the header and footer
import { loadHeaderFooter, recipeCardTemplate } from "./utils.mjs";
//Import the class that conects to TheMealDB
import ExternalServices from "./ExternalServices.mjs";
//Import the function that sets up the search form
import { setupSearch, setupCategoryFilter } from "./Search.mjs";

//Load the header and the footer on the home page
loadHeaderFooter();

// Create the connection to TheMealDB
const services = new ExternalServices();



// Gets the recipes and shows them as cards
async function displayRecipes() {
  const recipes = await services.searchRecipes();
  const recipeList = document.querySelector('#recipe-list');
  recipeList.innerHTML = recipes.map(recipeCardTemplate).join('');
}

displayRecipes();

// Returns the HTML for the recipe of the day
function recipeOfTheDayTemplate(recipe) {
  return `<article class="featured-recipe">
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
    <div class="featured-info">
      <h3>${recipe.strMeal}</h3>
      <p>${recipe.strCategory} · ${recipe.strArea || 'International'}</p>
      <a href="/recipe/index.html?id=${recipe.idMeal}" class="button">View recipe</a>
    </div>
  </article>`;
}

// Gets a random recipe and shows it as the recipe of the day
async function displayRecipeOfTheDay() {
  const recipe = await services.getRandomRecipe();
  const container = document.querySelector('#recipe-of-the-day');
  container.innerHTML = recipeOfTheDayTemplate(recipe);
}

displayRecipeOfTheDay();

//Activates the search form on the home page
setupSearch();
//Activates the category filter on the home page
setupCategoryFilter();