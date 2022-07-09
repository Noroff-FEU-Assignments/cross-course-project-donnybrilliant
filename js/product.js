const productPage = document.querySelector("#product-page");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const productUrl = `https://vierweb.no/cross-course-project/wp-json/wc/store/products/${productId}`;

async function getProduct(url) {
  try {
    const response = await fetch(url);
    const product = await response.json();
    console.log(product);
    const productPrice = product.prices.currency_symbol + product.prices.price;
    productPage.innerHTML = "";
    productPage.innerHTML += `
    <h1>${product.name}</h1>
    <div class="product-description">${product.description}</div>
    <img src="${product.images[0].src}" alt="${product.images[0].alt}">
    <h2>${productPrice}</h2>
    <a href="cart.html?id=${product.id}" id="next-button" class="button">
        <h6>ADD TO CART</h6>
    </a>`;
  } catch (error) {
    productPage.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getProduct(productUrl);
