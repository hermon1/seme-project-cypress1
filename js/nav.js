const bars = document.querySelector(".fa-bars");
const navigation = document.querySelector("nav");
bars.onclick = function () {
  if (navigation.style.display === "none") {
  } else {
    navigation.style.display = "block";
  }
};
