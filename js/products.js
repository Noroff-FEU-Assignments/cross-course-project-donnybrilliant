const baseUrl =
  "https://vierweb.no/cross-course-project/wp-json/wc/store/products";
const productWrapper = document.querySelector(".product-wrapper");

async function getProducts(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    productWrapper.innerHTML = "";
    data.forEach((product) => {
      const productImage = product.images[0].src;
      const productAlt = product.images[0].alt;
      const productName = product.name;

      const productPrice =
        product.prices.currency_symbol + product.prices.price;

      productWrapper.innerHTML += `
        <a href="product.html?id=${product.id}">
        <div>
        <img src="${productImage}" alt="${productAlt}" />
        <div class="product-info">
          <h3>${productName}</h3>
          <p>${productPrice}</p>
        </div></a>`;
    });
  } catch (error) {
    productWrapper.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getProducts(baseUrl);
