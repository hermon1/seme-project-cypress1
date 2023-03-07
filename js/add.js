import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

if (!token) {
  location.href = "index.html";
}

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const myImage = document.querySelector("#myfile");
const featured = document.querySelector("#featured");
const myCheckbox = document.querySelector("#checkbox");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featured = myCheckbox.checked;

  console.log(myImage);
  console.log("priceValue", priceValue);
  console.log(featured);
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
  addProduct(titleValue, priceValue, descriptionValue, featured, myImage);
}
async function addProduct(title, price, description, featured, myImage) {
  const url = `${baseUrl}products` + "?populate=*";
  console.log(myImage);
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
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);
    displayMessage("success", "Product created", ".message-container");
    form.reset();

    if (json.data.attributes.created_at) {
      let image = "image/logo.png";
      if (json.data.attributes.image.data.attributes.url) {
        image = json.data.attributes.image.data.attributes.url;
      }

      console.log(displayMessage);
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }

    console.log(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".message-container");
  }
}
