import ExternalServices from './ExternalServices.mjs';
import { recipeCardTemplate } from './utils.mjs';

// Create the connection to TheMealDB
const services = new ExternalServices();

// Shows the search results as recipe cards, or a message if nothing was found
function displayResults(recipes) {
  const recipeList = document.querySelector('#recipe-list');

  if (recipes) {
    recipeList.innerHTML = recipes.map(recipeCardTemplate).join('');
  } else {
    recipeList.innerHTML = '<p>No recipes found. Try another search.</p>';
  }
}

// Listens to the search form and runs the right search
export function setupSearch() {
  const form = document.querySelector('#search-form');

  form.addEventListener('submit', async (event) => {
    // Stop the form from reloading the page
    event.preventDefault();

    const searchType = document.querySelector('#search-type').value;
    const searchText = document.querySelector('#search-input').value.trim();

    let recipes;
    if (searchType === 'name') {
      recipes = await services.searchRecipes(searchText);
    } else {
      recipes = await services.searchByIngredient(searchText);
    }

    displayResults(recipes);
  });
}

export function setupCategoryFilter() {
  const select = document.querySelector('#category-select');

  select.addEventListener('change', async () => {
    const category = select.value;

    let recipes;
    if (category === '') {
      // "All" shows the general list again
      recipes = await services.searchRecipes();
    } else {
      recipes = await services.filterByCategory(category);
    }

    displayResults(recipes);
  });
}