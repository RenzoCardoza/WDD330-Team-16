/* eslint-disable no-undef */
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discount = product.FinalPrice - product.SuggestedRetailPrice;
  let oldPrice = '';
  let discountPercentage = '';
  if(discount < 0){
    oldPrice = product.SuggestedRetailPrice;
    discountPercentage = (discount / product.SuggestedRetailPrice) * 100;
    discountPercentage = `off /(${discountPercentage.toFixed(2)}%)`;
    oldPrice = `<span class="discount">$${oldPrice}</span> <br>`;
  }
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price"> ${oldPrice} <span class="goodPrice">$${product.FinalPrice} ${discountPercentage} </span></p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sortBy = null;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    this.renderList(list);
    if (document.querySelector(".title")) {
      document.querySelector(".title").innerHTML = this.category;
    }
    this.setupSortListeners();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }


  // MP Task - Product Sort List by Price and Name
  setupSortListeners() {
    const sortByNameBtn = document.querySelector("#sortByName");
    const sortByPriceBtn = document.querySelector("#sortByPrice");

    sortByNameBtn.addEventListener("click", () => {
      this.sortBy = "name";
      this.sortAndRender();
    });

    sortByPriceBtn.addEventListener("click", () => {
      this.sortBy = "price";
      this.sortAndRender();
    });
  }

  async sortAndRender() {
    const list = await this.dataSource.getData(this.category);
    const arrayFromObject = Object.values(list);

    const sortBy = this.sortBy;
    let sortedList = [];

    if (sortBy === "name") {
        sortedList = arrayFromObject.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortBy === "price") {
        sortedList = arrayFromObject.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    this.renderList(sortedList);
}
}