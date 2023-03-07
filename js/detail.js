import { baseUrl } from "./settings/api.js";
import { getExcistingProducts } from "./utils/addedFunction.js";
import displayMessage from "./components/common/displayMessage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id + "?populate=*";

console.log(productUrl);

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log(details);

    document.title = details.name;

    const container = document.querySelector(".detail-container");

    const addedCartProducts = getExcistingProducts();
    console.log(details);

    let cssClass = "fa-cart-plus";

    const doesCartProductExcist = addedCartProducts.find(function (added) {
      console.log(added);

      return parseInt(added.id) === details.id;
    });

    if (doesCartProductExcist) {
      cssClass = "fa-trash-alt";
    }

    console.log(doesCartProductExcist);

    if (doesCartProductExcist) {
      cssClass = "fa";
    }

    container.innerHTML = `
   
  
      <div class="packet first">
    <div class="card img" style="background-image: url(http://localhost:1337${details.data.attributes.image.data.attributes.url}"></div>
    
    </div>
  
    <div class="packet second">
    <h4>${details.data.attributes.title}</h4>
    <p>$${details.data.attributes.price}</p>
    <div class="button2">
   
    <i class="fas ${cssClass}"data-id="${details.data.id}" data-title="${details.data.attributes.title}" data-price="${details.data.attributes.price}" data-image="url(http://localhost:1337${details.data.attributes.image.data.attributes.url}"></i></div>
    
    <p style="color: red;">FREE shipping</p>
    
              
    <hr />
    <p class="detail-p">${details.data.attributes.description}</p> 
   
    </div
                          

                           
                           `;

    const addbutton = document.querySelectorAll(".button2 i");
    console.log(addbutton);

    addbutton.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    function handleClick() {
      this.classList.toggle("fa-trash-alt");
      this.classList.toggle("fa-cart-plus");

      const id = this.dataset.id;
      const title = this.dataset.title;
      const price = this.dataset.price;
      const image = this.dataset.image;
      console.log("id", id);
      console.log("title", title);
      console.log("price", price);
      console.log("image", image);
      const currentExcistingProds = getExcistingProducts();

      const cartProductExist = currentExcistingProds.find(function (added) {
        return added.id === id;
      });
      console.log("cartProductExist", cartProductExist);

      if (cartProductExist === undefined) {
        const product = { id: id, title: title, price: price, image: image };
        currentExcistingProds.push(product);

        saveProds(currentExcistingProds);
      } else {
        const newAdded = currentExcistingProds.filter(
          (added) => added.id !== id
        );
        saveProds(newAdded);
      }
    }

    function saveProds(prods) {
      localStorage.setItem("addedCartProducts", JSON.stringify(prods));
    }

    console.log(details);
  } catch (error) {
    displayMessage("error", error, ".detail-container");
  }
})();
