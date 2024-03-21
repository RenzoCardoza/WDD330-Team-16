import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document.addEventListener("DOMContentLoaded", () => {
    // Add event listener after DOM is fully loaded
    document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
      e.preventDefault();
      myCheckout.checkout();
    });
    document.querySelector("#zip").addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
});