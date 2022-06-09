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
    ${product.description}
    <img src="${product.images[0].src}" alt="The Explorer Product Photo">
    <p class="price">${productPrice}</p>
    <a href="cart.html?id=${product.id}" id="next-button" class="button">
        <h2>ADD TO CART</h2>
    </a>`;
  } catch (error) {
    productPage.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getProduct(productUrl);
