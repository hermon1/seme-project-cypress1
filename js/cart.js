import { baseUrl } from "./settings/api.js";
import { getExcistingProducts } from "./utils/addedFunction.js";

const addedCartProducts = getExcistingProducts();
const cartContainer = document.querySelector(".cart-container");
const totalContainer = document.querySelector(".cart-total-container");

let total = 0;
let cssClass = "fa-trash-alt";

function cartCall() {
  if (addedCartProducts.length === 0) {
    cartContainer.innerHTML = "There Are No Products In The Cart";
    totalContainer.innerHTML = "";
  }

  addedCartProducts.forEach((cartItem) => {
    console.log(cartItem);

    cartContainer.innerHTML += `<div class="product">
  <h4>${cartItem.title}</h4>
  <p>$${cartItem.price}</p>
 
  <div class="cart-img" style="background-image: ${cartItem.image}"></div>
  <a href="detail.html?id=${cartItem.id}" class="button-back-detail"><i class="fa-solid fa-arrow-left"></i>Back to detail</a>

  
  <div class="cart-remove-button-container">
  <i class="fas ${cssClass}" data-id="${cartItem.id}" data-title="${cartItem.title}" data-link="" data-price="${cartItem.price}" data-image="${cartItem.image}"></i>
</div>
</div>`;

    const addButton = document.querySelectorAll(
      ".cart-remove-button-container i"
    );

    addButton.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    function handleClick() {
      this.classList.toggle("fa-trash-alt");
      this.classList.toggle("fa-cart-plus");

      const id = this.dataset.id;
      const title = this.dataset.title;
      const price = this.dataset.price;
      const image = this.dataset.image;
      const currentStoredProds = getExcistingProducts();
      const cartItemExists = currentStoredProds.find(function (added) {
        return added.id === id;
      });
      if (cartItemExists) {
        const newAdds = currentStoredProds.filter((adds) => adds.id !== id);
        saveProds(newAdds);
        cartContainer.innerHTML = "";
        location.href = "cart.html";
      }
    }
    function saveProds(prods) {
      localStorage.setItem("cart", JSON.stringify(prods));
    }
  });
}
cartCall();
console.log(addedCartProducts);

for (let i = 0; i < addedCartProducts.length; i++) {
  totalContainer.innerHTML = "";

  total += parseInt(addedCartProducts[i].price);
  console.log(typeof total);

  totalContainer.innerHTML = `<h4 class="cart-total-h4">Total $ ${total}</h4>`;
}
