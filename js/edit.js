import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");
console.log(id);
if (!id) {
  document.location.href = "edit.html?id=42";
}

const productUrl = baseUrl + "products/" + id + "?populate=*";

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const myImage = document.querySelector("#myfile");
const featured = document.querySelector("#featured");
const myCheckbox = document.querySelector("#checkbox");

const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log(details);
    title.value = details.data.attributes.title;
    price.value = details.data.attributes.price;
    description.value = details.data.attributes.description;

    deleteButton(details.data.id);

    featured.value = details.data.attributes.featured;
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featured = myCheckbox.checked;

  console.log(featured);
  console.log(myImage);
  console.log("priceValue", priceValue);

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message-container"
    );
  }
  updateProduct(titleValue, priceValue, descriptionValue, featured, myImage);
}
async function updateProduct(title, price, description, featured, myImage) {
  const url = baseUrl + "products/" + id;

  const formData = new FormData();

  if (myImage.files.length === 0) {
    return alert("Select an image");
  }

  const file = myImage.files[0];
  console.log(file);

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
  });

  formData.append("files.image", file, file.name);

  formData.append("data", data);

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.data.attributes.updatedAt) {
      displayMessage("success", "Product updated", ".message-container");
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
