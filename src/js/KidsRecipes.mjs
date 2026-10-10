import ExternalServices from './ExternalServices.mjs';
import { recipeCardTemplate } from './utils.mjs';

// Create the connection to TheMealDB
const services = new ExternalServices();

// Reads the list of kids recipe IDs from the JSON file
async function getKidsRecipeIds() {
  const response = await fetch('/json/kids-recipes.json');
  const ids = await response.json();
  return ids;
}

// Gets each kids recipe from TheMealDB and shows them as cards
export async function displayKidsRecipes() {
  const ids = await getKidsRecipeIds();
  const recipes = [];

  // Get the full recipe for each ID in the list
  for (const id of ids) {
    const recipe = await services.getRecipeById(id);
    recipes.push(recipe);
  }

  const list = document.querySelector('#kids-list');
  list.innerHTML = recipes.map(recipeCardTemplate).join('');
}