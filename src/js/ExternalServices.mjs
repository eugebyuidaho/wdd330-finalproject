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
}