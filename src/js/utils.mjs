//Inserts a template into a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

//Fetches an HTML and returns its content as a text
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

//Loads the header and footer partials into the page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  const headerElement = document.querySelector('#main-header');
  const footerElement = document.querySelector('#main-footer');

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // Show the current year in the footer
  document.querySelector('#current-year').textContent = new Date().getFullYear();
  setupMenuButton();
}

// Shows or hides the navigation when the menu button is clicked
function setupMenuButton() {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');

  menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Returns the HTML for one recipe card
export function recipeCardTemplate(recipe) {
  
  let details = '';
  if (recipe.strCategory) {
    details = `<p>${recipe.strCategory} · ${recipe.strArea || 'International'}</p>`;
  }

  return `<article class="recipe-card">
    <a href="/recipe/index.html?id=${recipe.idMeal}">
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy">
      <h3>${recipe.strMeal}</h3>
      ${details}
    </a>
  </article>`;
}

//Returns the value of a parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

//Reads data from localStorage and converts it from JSON
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Converts data to JSON and saves it in localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}