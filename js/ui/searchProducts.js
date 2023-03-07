import { renderProducts } from "./renderProducts.js";

export function searchProducts(products) {
  console.log(products);
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    console.log(event);

    const searchValue = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (product.attributes.title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });

    renderProducts(filteredProducts);
  };
}
