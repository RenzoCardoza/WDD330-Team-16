import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Check if cartItems is not null
  if (cartItems !== null) {
    // Convert the values of the cartItems object into an array
    const cartItemsArray = Object.values(cartItems);

    // Create HTML for each item in the array
    const htmlItems = cartItemsArray.map(item => cartItemTemplate(item)).join("");
    
    // Set the innerHTML of the product-list element
    document.querySelector(".product-list").innerHTML = htmlItems;
  } else {
    console.error("Cart is empty or not found.");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
