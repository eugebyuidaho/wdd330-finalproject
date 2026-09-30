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