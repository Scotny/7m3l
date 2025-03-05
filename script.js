let list = document.getElementById("cards");
let cart = document.getElementById("product");
let total = document.getElementById("total");

let ctgr = document.getElementById("category");
let sort = document.getElementById("price");
let search = document.querySelector("input[type='search']");

let data = []; // Store all products

// Fetch and render products
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((res) => {
    data = res;
    show(data);
  });

// Create product card
function card(item) {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <img src="${item.image}" alt="product">
    <h2>${item.title}</h2>
    <h3>${item.category}</h3>
    <h2 class="price">$${item.price.toFixed(2)}</h2>
    <button class="buy">Sotib olish</button>
  `;
  list.appendChild(div);

  // Add to cart
  div.querySelector(".buy").addEventListener("click", () => {
    if (confirm("Savatga qo'shilsinmi?")) {
      cart.innerHTML += `${item.title} - $${item.price.toFixed(2)}<br>`;
      total.innerHTML = `Total: $${(
        parseFloat(total.innerHTML.replace("Total: $", "") || 0) + item.price
      ).toFixed(2)}`;
    }
  });
}

// Render filtered/sorted products
function show(items) {
  list.innerHTML = "";
  items.forEach(card);
}

// Apply filters
function filter() {
  let res = data.filter(
    (i) =>
      (ctgr.value === "default" || i.category === ctgr.value) &&
      i.title.toLowerCase().includes(search.value.toLowerCase())
  );

  if (sort.value === "down") res.sort((a, b) => a.price - b.price);
  if (sort.value === "up") res.sort((a, b) => b.price - a.price);

  show(res);
}

// Event listeners
[ctgr, sort, search].forEach((el) => el.addEventListener("input", filter));
