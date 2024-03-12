import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  getCartTotalCost(cartItems);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const cartItemsArray = Object.values(cartItems);

//   const htmlItems = cartItemsArray.map(item => cartItemTemplate(item)).join("");
//   document.querySelector(".product-list").innerHTML = htmlItems;
// }

function getCartTotalCost(cartItems){
  if(cartItems.length > 0){
    let total = 0;
    cartItems.forEach(item => {
      total += item.FinalPrice;
    });

    document.querySelector(".cart-total").innerHTML = `Total: $ ${total}`;
    document.querySelector(".cart-footer").classList.remove("hide");
    return;
  }
  document.querySelector(".cart-footer").classList.add("hide");
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