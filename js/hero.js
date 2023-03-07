export function heroBanner(products) {
  const container = document.querySelector(".hero-container");

  container.innerHTML = "";

  container.innerHTML += ` <div class="hero-img" style="background-image: url(http://localhost:1337${products.attributes.hero_banner.data.attributes.url}"> 
      <h1>Nostalgia For Your Ears</h1>
      <p class="undertitle">second hand vinyl from the golden age</p>
      <a href="shop.html" class="button1">SHOP NOW</a> </div>                             `;
}
