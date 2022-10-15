const baseUrl =
  "https://vierweb.no/cross-course-project/wp-json/wc/store/products";
const adventureList = document.querySelector("#adventure-list");
const productWrapper = document.querySelector(".product-wrapper");

async function getProducts(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    adventureList.innerHTML = "";
    productWrapper.innerHTML = "";
    data.forEach((product) => {
      const productImage = product.images[0].src;
      const productAlt = product.images[0].alt;
      const productBackground = product.images[1].src;
      const productName = product.name;
      const productSlug = product.name.toLowerCase().replace(/ /g, "-");
      const productPrice =
        product.prices.currency_symbol + product.prices.price;
      adventureList.innerHTML += `
      <a href="product.html?id=${product.id}">
      <section id="${productSlug}" class="product-hero">
        <h4>${productName}</h4>
      </section>
      </a>
`;
      const productContainer = document.querySelector(`#${productSlug}`).style;
      productContainer.backgroundImage = `url(${productBackground})`;
      productContainer.backgroundSize = "cover";
      productContainer.backgroundPosition = "center";

      /*       switch (productSlug) {
        case "the-climber":
          productContainer.backgroundPosition = "right";
          break;
        case "the-urban":
          productContainer.color = "var(--white)";
          break;
      } */

      productWrapper.innerHTML += `
        <a href="product.html?id=${product.id}">
        <div>
        <img src="${productImage}" alt="${productAlt}" />
        <div class="product-button">
          <h5>${productName}</h5>
          <p>${productPrice}</p>
        </div></a>`;
    });
  } catch (error) {
    adventureList.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getProducts(baseUrl);
