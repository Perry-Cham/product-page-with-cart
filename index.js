import { QtyButton, OrderModal } from './JS/components.js'

const cartButtons = document.querySelectorAll(".cart-button")
const cardImageDiv = document.querySelectorAll('.card-image')
const foodCards = document.querySelectorAll(".food-card")
let products = [];
let cart = [];
const cartList = document.querySelector(".cart-list")
const itemDisplay = document.querySelector("#item-display");
const noItemMessage = document.querySelector("#no-item-message");
const cartImage = document.querySelector(".cart-image");

async function Get() {
  const response = await fetch('http://localhost:7700/data.json');
  const data = await response.json();
  return data;
}

async function main() {
  const products = await Get();
  startUp(products);

}

main();


function startUp(products) {
  products.forEach((child, index) => {
    child.dataId = index;
    child.quantity = 0;
  })
  setUp(products);
  buttonLogic(products);
}

function setUp() {
  foodCards.forEach((child, index) => {
    child.setAttribute("data-id", `${index}`)
  })
  cardImageDiv.forEach((child, index) => {
    const button = new QtyButton();
    button.append(child, `${index}`);
  })
}
function buttonLogic(products) {

  cartButtons.forEach((cartButton) => {

    //iterate through the add to cart buttons

    cartButton.addEventListener("click", (e) => {

      const cartBtns = document.querySelectorAll(".cart-add")

      //Get the buttons id and compare it with productId

      cartBtns.forEach((button) => {

        const productId = e.target.parentNode.parentNode.getAttribute('data-id');

        const buttonId = button.getAttribute('data-id');

        if (buttonId === productId) {
          button.classList.add('active')

          const qty = e.target.parentNode.querySelector(".qty");

          const product = products.find((child) => child.dataId == productId)

          qty.innerHTML = product.quantity

          //Add increment and decrement functions
          const actionButtons = e.target.parentNode.querySelectorAll(".cart-add i");
          actionButtons[0].addEventListener("click", () =>
            increment(product,
              qty))
          actionButtons[1].addEventListener("click", () => decrement(product, qty))
          cartLogic(product, products);
          console.log(products)

          //Loop through the card images and add the selected class to the cardImage div with an id = the buttonId
          foodCards.forEach((card) => {
            const cardId = card.getAttribute("data-id")
            if (cardId === buttonId) card.querySelector(".card-image").classList.add("selected")
          })
        }
      })
    })
  })
}

function cartLogic(product, products) {
  cartList.innerHTML = "";
  let cartTotal = 0;
  const cartTotalDisplay = document.querySelector(".cart-total")
  const lowerCartBody = document.querySelector(".lowerCartWrapper")


  if (product) {
    if (!cart.includes(product) && product.quantity > 0) {
      cart.push(product);
    }
  }

  cart.forEach(child => {
    const tag = document.createElement('div')
    const price = child.price;
    tag.setAttribute('data-id', child.dataId)
    tag.innerHTML = `
      <h4>${child.name}</h4>
      <p><span
      class=qty>${child.quantity}x</span>&nbsp;&nbsp;&nbsp;@${(child.price).toFixed(2)}
      
      &nbsp;<span>$${(child.price * child.quantity).toFixed(2)}</span></p>
      <button data-id=${child.dataId} class=${"remove-icon"}>
      <img data-Id=${child.dataId} src=${"assets/images/icon-remove-item.svg"}>
      </button>
        `;
    const removeIconI = tag.querySelector(".remove-icon")
    const removeIcon = tag.querySelector(".remove-icon img")
    removeIconI.addEventListener("click", (e) => removeItem(e.target, products))
    removeIcon.addEventListener("click", (e) => removeItem(e.target, products))

    cartList.appendChild(tag)
    cartTotal += child.quantity * child.price;
  })

  itemDisplay.innerHTML = `Your Cart (${cart.length})`;


  if (cart.length > 0) {
    noItemMessage.style.display = "none";
    cartImage.style.display = "none";
    cartTotalDisplay.classList.add("active")
    lowerCartBody.classList.add("active")
  } else {
    lowerCartBody.classList.remove("active");
    cartTotalDisplay.classList.remove("active");
    noItemMessage.style.display = "block";
    cartImage.style.display = "block";
  }

  document.querySelector(".cart-total p").innerHTML = `$${(cartTotal).toFixed(2)}`;


  const orderBtn = document.querySelector(".order-btn")
  orderBtn.addEventListener("click", () => {
    confirmedOrderLogic(cart)
  })
}

function confirmedOrderLogic(cart) {
  const orderModal = new OrderModal();
  orderModal.create();
  orderModal.render(cart);

}

function removeItem(e, products) {
  let compare = e.getAttribute("data-id");
  cart.forEach((child, index) => {
    const yes = child.dataId == compare;
    if (yes) {
      child.delete = true;
      cart = cart.filter((product) => product.delete != true)

      foodCards.forEach((div) => {
        if (div.getAttribute("data-id") == compare) {
          const cardImage = div.querySelector(".card-image");
          cardImage.classList.remove("selected")
          const cartAdd = div.querySelector(".cart-button.cart-add")
          cartAdd.classList.remove("active")

        }
      })
      cartLogic()
    }
  })
  // const product = products.find(p => p.dataId == compare)
  console.log(products)
}
function increment(product, tag) {
  product.quantity++;
  tag.innerHTML = product.quantity;
  cartLogic(product)
}
function decrement(product, tag) {
  product.quantity--;
  tag.innerHTML = product.quantity;
  cartLogic(product)
}