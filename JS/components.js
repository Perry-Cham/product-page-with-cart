export class QtyButton {
  constructor() {
    this.button = document.createElement('button');
    this.increment = document.createElement('i');
    this.decrement = document.createElement('i');
    this.display = document.createElement('p');
    this.incrementImage = new Image();
    this.incrementImage.src = 'assets/images/icon-increment-quantity.svg';
    this.decrementImage = new Image();
    this.decrementImage.src = 'assets/images/icon-decrement-quantity.svg';
  }
  append(tag, index) {
    this.button.classList.add('cart-button')
    this.button.setAttribute('data-id', index)
    this.button.classList.add('cart-add')
    this.increment.classList.add('cart-add-i')
    this.increment.classList.add('add')
    this.decrement.classList.add('cart-add-i')
    this.decrement.classList.add('subtract')
    this.display.classList.add('qty')

    //add Images To Icons
    this.increment.appendChild(this.incrementImage)
    this.decrement.appendChild(this.decrementImage)

    //add icons and qty to the button
    this.button.appendChild(this.increment)
    this.button.appendChild(this.display)
    this.button.appendChild(this.decrement)

    //append the button to the tag passed as an argument
    tag.appendChild(this.button)
  }
}

export class OrderModal {
  constructor() {
    this.body = document.createElement("div")
    this.icon = document.createElement("i")
    this.products = document.createElement("div")
    this.totalDisplay = document.createElement('div')
    this.newOrderBtn = document.createElement('button')
  }
  create() {
    const classes = ["modal", "modal-heading", "modal-p", "modal-products", "modal-total", "modal-btn", "modal-i"]
    const modal = {
      modal: 0,
      heading: 1,
      paragraph: 2,
      products: 3,
      total: 4,
      button: 5,
      icon: 6
    }

    //Setting up the modals skeleton
    this.body.classList.add("modal")

    this.body.innerHTML = `<div class=${classes[modal.icon]}></div> <h1 class=${classes[modal.heading]}> ORDER
    CONFIRMED</h1>
      <p class=${classes[modal.paragraph]}> We hope you enjoy your food!</p>`


    //Adding classes to the rest of the elements


    //Products Display
    this.products.classList.add(classes[modal.products])


    //Order total
    this.totalDisplay.classList.add(classes[modal.total])


    //New order button
    this.newOrderBtn.textContent = "Start New Order";
    this.newOrderBtn.classList.add(classes[modal.button])

    //Append the elements to the modal body
    this.body.appendChild(this.products)
    this.body.appendChild(this.totalDisplay)
    this.body.appendChild(this.newOrderBtn)
  }

  render(products) {

    let total = 0;

    //Loop through Everything in the cart and add them to the products div element

    products.forEach((product) => {
      let tag = document.createElement("article");
      tag.classList.add("modal-article")
      tag.innerHTML = `<img class=${"modal-image"} src = ${product.image.thumbnail}>
      <div class=${"two"}>
      <h4>${product.name}</h4> <p><span>${product.quantity}x</span>
      &nbsp;&nbsp; @${product.price.toFixed(2)}</p>
      </div>
      <div class=${"three"}>
         <p>$${(product.quantity).toFixed(2)}</p>
        </div>`
      this.products.appendChild(tag)
      total += product.price *
        product.quantity;
    })


    //Create the total display's html
    this.totalDisplay.innerHTML = `<h3> Order Total</h3>
    <p>$${total.toFixed(2)}</p>`

    //Add an event listener to the button


    //Wrap the modal in a wrapper and append the it to the DOM
    if (!document.querySelector(".modal")) {
      const wrapper = document.createElement("div")
      wrapper.classList.add("modal-wrapper")
      wrapper.appendChild(this.body)
      document.body.appendChild(wrapper)
    }
  }
  handleClick() {
    document.body.removeChild(this.body)
  }
}