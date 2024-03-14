// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// function to take a list of objects and a template and insert the objects as HTML into the DOM

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback
) {
  // if clear is true we need to clear out the contents of the parent.
  parentElement.insertAdjacentHTML("afterbegin", templateFn)
  if (callback) {
    callback(data)
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("./partials/header.html");
  const footer = await loadTemplate("./partials/footer.html");
  const headerElement = document.getElementById("page-header");
  const footerElement = document.getElementById("page-footer");
  renderWithTemplate(header, headerElement, "", updateCartItemCount());
  renderWithTemplate(footer, footerElement);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);

}

 // Functiin to upload  enumber of items in cart
 export function updateCartItemCount() {
  // Obtain a lis of elements of the cart from Local Storage 
  const cartItems = JSON.parse(localStorage.getItem("so-cart"));

  // Obtain an element in cart
  const cartElement = document.querySelector(".cart");

  // If there arelements in cart
  if (cartItems && cartItems.length > 0) {
    // Create an element to the superindex
    const badgeElement = document.createElement("sup");
    badgeElement.classList.add("badge");
    // Text of the element = quantity of elements in cart
    badgeElement.textContent = cartItems.length;
    cartElement.appendChild(badgeElement);
  }
}

// Call the function to update cart
updateCartItemCount();

