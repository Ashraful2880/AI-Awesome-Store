// //-----------> Load Data From API <-------------// //
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// // ----------> Show Products In UI <-----------// //

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.classList.add("ms-3");
    div.classList.add("py-3");
    div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <p>Rating:<span class="text-warning fw-bold">${product.rating.rate} </span> (${product.rating.  count})</p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">
          add to cart
        </button>
        <button type="button" id="details-btn" class="btn btn-danger" data-bs-toggle="modal"       data-bs-target="#exampleModal">
          Details
        </button>
      </div>
      `;
    document.getElementById("product-container").appendChild(div);
  }
};

// //----------> Update Cart Product Quantity Function <-----------// //

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal(); 
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// // ------------> Update Main Price Function <-------------// //

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText =(total.toFixed(2));
};

// // -------------> Set InnerText Function <--------------- // //

const setInnerText = (id, value) => {
  document.getElementById(id).innerText =(value.toFixed(2));
};

// //---------> Update Delivery Charge & Total Tax <--------// // 

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

// //-----------> Grand-Total Update Function <---------------// //

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};