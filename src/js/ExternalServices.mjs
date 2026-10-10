const baseURL = 'https://www.themealdb.com/api/json/v1/1/';

// Converts the response to JSON or throws an error if the request failed
async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad response from TheMealDB');
  }
}

export default class ExternalServices {
  // Searches recipes by name, an empty name returns a general list
  async searchRecipes(name = '') {
    const response = await fetch(`${baseURL}search.php?s=${name}`);
    const data = await convertToJson(response);
    return data.meals;
  }

  // Gets one random recipe
  async getRandomRecipe() {
    const response = await fetch(`${baseURL}random.php`);
    const data = await convertToJson(response);
    return data.meals[0];
  }

  // Searches recipes that use a specific ingredient
  async searchByIngredient(ingredient) {
    const response = await fetch(`${baseURL}filter.php?i=${ingredient}`);
    const data = await convertToJson(response);
    return data.meals;
  }

  // Gets the recipes of one category
  async filterByCategory(category) {
    const response = await fetch(`${baseURL}filter.php?c=${category}`);
    const data = await convertToJson(response);
    return data.meals;
  }

  // Gets the details of one recipe by its ID
  async getRecipeById(id) {
    const response = await fetch(`${baseURL}lookup.php?i=${id}`);
    const data = await convertToJson(response);
    return data.meals[0];
  }
}