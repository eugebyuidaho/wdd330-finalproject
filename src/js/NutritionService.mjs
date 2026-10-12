// Base URL and API key for Spoonacular (the key comes from the .env file)
const baseURL = 'https://api.spoonacular.com/';
const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;

// Converts the response to JSON or throws an error if the request failed
async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad response from Spoonacular');
  }
}

export default class NutritionService {
  // Estimates the nutrition of a dish using its name
  async getNutritionByName(dishName) {
    const response = await fetch(
      `${baseURL}recipes/guessNutrition?title=${dishName}&apiKey=${apiKey}`
    );
    const data = await convertToJson(response);
    return data;
  }
}