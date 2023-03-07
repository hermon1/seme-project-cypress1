import { baseUrl } from "./settings/api.js";
import { heroBanner } from "./hero.js";
import { renderProducts } from "./ui/renderProducts.js";
import { searchProducts } from "./ui/searchProducts.js";
import displayMessage from "./components/common/displayMessage.js";

const homeUrl = baseUrl + "home" + "?populate=*";

const productsUrl = baseUrl + "products" + "?populate=*";

async function getHero() {
  try {
    const response = await fetch(homeUrl);
    const json = await response.json();
    console.log(json);
    heroBanner(json.data);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, "hero-container");
  }
}
getHero();

async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    console.log(products);

    renderProducts(products.data);
    searchProducts(products.data);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
}
getProducts();
