fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => renderCard(data));

let cards = document.getElementById("cards");

function createCard(params) {
  let card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);

  let img = document.createElement("img");
  img.src = params?.image;
  card.appendChild(img);

  let title = document.createElement("h3");
  title.innerHTML = params?.title;
  card.appendChild(title);

  let p = document.createElement("p");
  p.innerHTML = params?.description;
  card.appendChild(p);

  let buy = document.createElement("div");
  buy.classList.add("buy");
  card.appendChild(buy);

  let price = document.createElement("h3");
  price.classList.add("price");
  price.innerHTML = "$" + params?.price;
  buy.appendChild(price);

  let order = document.createElement("button");
  order.innerHTML = "Sotib olish";
  buy.appendChild(order);

  return card;
}

function renderCard(params) {
  params.forEach((element) => {
    createCard(element);
  });
}

let product = document.getElementById("product");
let total = document.getElementById("total");

cards.addEventListener("click", (event) => {
    alert("Maxsulot savatga qoshildi")
    let button = event.target.closest("button");
    if (button) {
        let card = button.closest(".card");
        let title = card.querySelector("h3").innerHTML;
        let price = parseFloat(card.querySelector(".price").innerHTML.replace("$", "")).toFixed(2);

        product.innerHTML += `${title} - $${price}` + "<br>";
        total.innerHTML = "Total: $" + (parseFloat(total.innerHTML.replace("Total: $", "")) + parseFloat(price)).toFixed(2);
    }
});