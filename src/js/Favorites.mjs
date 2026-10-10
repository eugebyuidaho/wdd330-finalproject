import { getLocalStorage, setLocalStorage, recipeCardTemplate } from './utils.mjs';

// Name of the key where favorites are saved in localStorage
const favoritesKey = 'favorites';

// Returns the list of favorite recipes (or an empty list if there are none)
export function getFavorites() {
  return getLocalStorage(favoritesKey) || [];
}

// Checks if a recipe is already in favorites
export function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some((recipe) => recipe.idMeal === recipeId);
}

// Adds a recipe to favorites (only the data needed for the cards)
export function addFavorite(recipe) {
  const favorites = getFavorites();
  favorites.push({
    idMeal: recipe.idMeal,
    strMeal: recipe.strMeal,
    strMealThumb: recipe.strMealThumb,
    strCategory: recipe.strCategory,
    strArea: recipe.strArea,
  });
  setLocalStorage(favoritesKey, favorites);
}

// Removes a recipe from favorites
export function removeFavorite(recipeId) {
  const favorites = getFavorites();
  const updated = favorites.filter((recipe) => recipe.idMeal !== recipeId);
  setLocalStorage(favoritesKey, updated);
}

// Shows the favorite recipes as cards, or a message if there are none
export function displayFavorites() {
  const favorites = getFavorites();
  const list = document.querySelector('#favorites-list');

  if (favorites.length > 0) {
    list.innerHTML = favorites.map(recipeCardTemplate).join('');
  } else {
    list.innerHTML = '<p>You don\'t have favorite recipes yet. Open a recipe and click "Add to favorites".</p>';
  }
}