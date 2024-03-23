import { setLocalStorage, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
  let discount = product.FinalPrice - product.SuggestedRetailPrice;
  let oldPrice = '';
  let discountPercentage = '';
  if(discount < 0){
    oldPrice = product.SuggestedRetailPrice;
    discountPercentage = (discount / product.SuggestedRetailPrice) * 100;
    discountPercentage = `off /(${discountPercentage.toFixed(2)}%)`;
    oldPrice = `<span class="discount">$${oldPrice}</span> <br>`;
  }
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">${oldPrice} <span class="goodPrice">$${product.FinalPrice} ${discountPercentage} </span></p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = [];
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {

     // Retrieve the current cart from local storage
    const currentCart = JSON.parse(localStorage.getItem("so-cart")) || [];
  
    // Add the current product to the cart array
    currentCart.push(this.product);
  
    // Save the updated cart back to local storage
    setLocalStorage("so-cart", currentCart);

    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);

    // Trigger cart animation
    this.triggerCartAnimation();

  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
  triggerCartAnimation() {
    const cartIcon = document.getElementById("cartIcon");
    cartIcon.classList.add("cart-animation");
    // Remove the animation class after animation ends
    cartIcon.addEventListener("animationend", () => {
      cartIcon.classList.remove("cart-animation");
    });
  }
}