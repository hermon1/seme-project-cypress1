import { getToken } from "../utils/storage.js";
export function renderProducts(product) {
  const container = document.querySelector(".product-container");

  const token = getToken();

  let link = "detail";

  if (token) {
    link = "edit";
  }
  container.innerHTML = "";
  for (let i = 0; i < product.length; i++) {
    const apiImage = product[i].attributes.image.data
      ? product[i].attributes.image.data.attributes.url
      : "image/logo.jpg";

    container.innerHTML += `<section class="content" href="edit.html?id=${
      product[i].id
    }"></div>

  <div class="box one">
  
  <div class="box-img" style="background-image: url(http://localhost:1337${apiImage}">  </div>
  <h4>${product[i].attributes.title}</h4>
                                     
  <p>$ ${product[i].attributes.price}</p>

  <a href="${link}.html?id=${product[i].id}" class="button2">${
      link === "detail" ? "See" : "Edit"
    } Product</a>
                                    </div>       `;
  }
}
