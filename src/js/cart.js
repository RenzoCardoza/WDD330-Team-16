import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // console.log("CART ITEMS: ", typeof cartItems);
  // console.log("CART ITEMS: ", cartItems);
  const htmlItems = cartItemTemplate(cartItems);
  cartItemTemplate(cartItems);
  // console.log("ITEM NAME: ", cartItems.Name);
  // console.log("ITEM NAME: ", cartItems.Image);
  document.querySelector(".product-list").innerHTML = htmlItems;
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
