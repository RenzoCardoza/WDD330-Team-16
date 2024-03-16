/* eslint-disable no-undef */
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
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