const cartLine = document.querySelector("#cart-line");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");
const productSize = params.get("size");
const productQuantity = params.get("quantity");

const productUrl = `https://vierweb.no/cross-course-project/wp-json/wc/store/products/${productId}`;

async function getProduct(url) {
  try {
    const response = await fetch(url);
    const product = await response.json();
    const productPrice = product.prices.currency_symbol + product.prices.price;
    cartLine.innerHTML = "";
    cartLine.innerHTML += `
    <img src="${product.images[0].src}" alt="${product.images[0].alt}">
    <h2>${product.name}</h2> ${productSize}
    <label for="quantity">Quantity</label>
    <select name="quantity" id="quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    <p>${productPrice}</p>
    <i class="fas fa-times-circle"></i>`;
  } catch (error) {
    productPage.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getProduct(productUrl);
