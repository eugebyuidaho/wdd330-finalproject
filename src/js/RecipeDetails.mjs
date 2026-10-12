import { isFavorite, addFavorite, removeFavorite } from './Favorites.mjs';
import NutritionService from './NutritionService.mjs';

// Builds the list of ingredients with their measures
function ingredientsTemplate(recipe) {
  let items = '';

  // TheMealDB stores up to 20 ingredients in separate properties
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    // Skip the empty ones
    if (ingredient && ingredient.trim() !== '') {
      items += `<li>${measure} ${ingredient}</li>`;
    }
  }

  return `<ul class="ingredients">${items}</ul>`;
}

// Splits the instructions into paragraphs
function instructionsTemplate(recipe) {
  const steps = recipe.strInstructions.split('\n');
  let paragraphs = '';

  steps.forEach((step) => {
    if (step.trim() !== '') {
      paragraphs += `<p>${step}</p>`;
    }
  });

  return paragraphs;
}

// Returns the HTML for the nutrition information
function nutritionTemplate(nutrition) {
  return `<ul class="nutrition">
    <li><strong>${Math.round(nutrition.calories.value)}</strong> Calories</li>
    <li><strong>${Math.round(nutrition.protein.value)} g</strong> Protein</li>
    <li><strong>${Math.round(nutrition.fat.value)} g</strong> Fat</li>
    <li><strong>${Math.round(nutrition.carbs.value)} g</strong> Carbs</li>
  </ul>`;
}

// Returns the HTML for the full recipe
function recipeDetailsTemplate(recipe) {
  return `<article class="recipe-detail">
    <h1>${recipe.strMeal}</h1>
    <p class="recipe-info">${recipe.strCategory} · ${recipe.strArea || 'International'}</p>
    <button id="favorite-button" class="button"></button>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">

    <h2>Ingredients</h2>
    ${ingredientsTemplate(recipe)}

    <h2>Nutrition</h2>
    <p class="nutrition-note">Estimated values per serving.</p>
    <div id="nutrition">Loading nutrition...</div>

    <h2>Instructions</h2>
    ${instructionsTemplate(recipe)}
  </article>`;
}

export default class RecipeDetails {
  constructor(recipeId, dataSource) {
    this.recipeId = recipeId;
    this.dataSource = dataSource;
    this.recipe = {};
  }

  // Gets the recipe and shows it on the page
  async init() {
    this.recipe = await this.dataSource.getRecipeById(this.recipeId);
    this.renderRecipeDetails();
    this.displayNutrition();
  }

  renderRecipeDetails() {
    const container = document.querySelector('#recipe-details');
    container.innerHTML = recipeDetailsTemplate(this.recipe);
    //Activate the favorites button
    this.setupFavoriteButton(); 
  }

  // Shows "Add to favorites" or "Remove from favorites" depending on the recipe
  updateFavoriteButton() {
    const button = document.querySelector('#favorite-button');
    if (isFavorite(this.recipe.idMeal)) {
      button.textContent = '♥ Remove from favorites';
    } else {
      button.textContent = '♡ Add to favorites';
    }
  }

  // Adds or removes the recipe when the button is clicked
  setupFavoriteButton() {
    this.updateFavoriteButton();

    const button = document.querySelector('#favorite-button');
    button.addEventListener('click', () => {
      if (isFavorite(this.recipe.idMeal)) {
        removeFavorite(this.recipe.idMeal);
      } else {
        addFavorite(this.recipe);
      }
      this.updateFavoriteButton();
    });
  }

  // Gets the nutrition from Spoonacular and shows it
  async displayNutrition() {
    const container = document.querySelector('#nutrition');
    try {
      const nutritionService = new NutritionService();
      const nutrition = await nutritionService.getNutritionByName(this.recipe.strMeal);
      container.innerHTML = nutritionTemplate(nutrition);
    } catch {
      // If Spoonacular fails (for example, the daily limit was reached), show a message
      container.textContent = 'Nutrition information is not available right now.';
    }
  }
}