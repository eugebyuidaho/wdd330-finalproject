import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import RecipeDetails from './RecipeDetails.mjs';

// Load the header and footer
loadHeaderFooter();

// Get the recipe id from the URL and show the recipe
const recipeId = getParam('id');
const dataSource = new ExternalServices();
const recipe = new RecipeDetails(recipeId, dataSource);
recipe.init();
