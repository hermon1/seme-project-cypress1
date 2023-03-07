export function getExcistingProducts() {
    const prods = localStorage.getItem("addedCartProducts");
    console.log(prods);
    if (prods === null) {
      return [];
    } else {
      return JSON.parse(prods);
    }
  }