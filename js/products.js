const products = [
    { id: 1, name: "Phone 1", image: "images/22.jpg" ,price: 10 },
    { id: 2, name: "Phone 2", image: "images/22.jpg" ,price: 20 },
    { id: 3, name: "Phone 3", image: "images/22.jpg" ,price: 30 },
    { id: 4, name: "حقيبة نسائية", image: "images/8.jpg" ,price: 30 },
    { id: 5, name: "اكسسوار شكلة", image: "images/7.jpg" ,price: 30 },
    { id: 6, name: "حقيبة رجالية", image: "images/10.jpg" ,price: 30 },
    { id: 7, name: "Note 13", image: "images/11.jpg" ,price: 30 },
    { id: 8, name: "SAMSUNG A52", image: "images/1.jpg" ,price: 30 }
  ];

document.addEventListener("DOMContentLoaded", function(){
    products.forEach( (p) => createProduct(p))
});

const cart=[]

const cartCounter = document.getElementById("cart-counter")

const cartBtn = document.getElementById("cart-btn")
cartBtn.addEventListener("click",saveCart)
 
function createProduct(p){
    //create product card div
    const productCard = document.createElement("div")
    productCard.classList.add("card","h-100")

    //create product img
    const productImg = document.createElement("img")
    productImg.classList.add("ard-img-top")
    productImg.setAttribute('src',p.image);

    //create card body
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body","p-4")

    //create text div
    const titleDiv = document.createElement("div")
    titleDiv.classList.add("text-center")

    //create product title h5
    const productName = document.createElement("h5")
    productName.classList.add("fw-bolder")
    productName.textContent = p.name

    //create product price p
    const productPrice = document.createElement("p")
    productPrice.classList.add("price")
    productPrice.textContent = p.price +" SP"

    //append product name to title div
    titleDiv.appendChild(productName)
    titleDiv.appendChild(productPrice)

    //append title div to cart body
    cardBody.appendChild(titleDiv)

    //create actionsDiv
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-footer","p-4","pt-0","border-top-0","bg-transparent")

    //create add to cart link  wrapper
    const wrapper = document.createElement("div");
    wrapper.classList.add("text-center")

    //create add to cart link
    const addToCartLink = document.createElement("a")
    addToCartLink.classList.add("btn","btn-outline-dark","mt-auto")
    //addToCartLink.setAttribute("href","#")
    addToCartLink.textContent ="Add to Cart"
    addToCartLink.setAttribute("data-id",p.id)
    addToCartLink.addEventListener("click",addToCart)

    //append add to cart link to wrapper
    wrapper.appendChild(addToCartLink)

    //append wrapper to actionsDiv
    actionsDiv.appendChild(wrapper)

    // append elememts to product card
    productCard.appendChild(productImg)
    productCard.appendChild(cardBody)
    productCard.appendChild(actionsDiv)

    //create bootstrap column and append product card to it
    const col= document.createElement("div")
    col.classList.add("col","mb-5")
    col.appendChild(productCard)

    //add card to products div
    document.getElementById("products").appendChild(col)
}


function addToCart(event){
    const productId = event.target.getAttribute('data-id')
    const product = products.find((p)=> p.id == productId)
    //add quantity field
    product.quantity = 1
    //console.log(productId)
    cart.push(product)

    //disable add button
    event.target.textContent = "remove from cart"
    event.target.removeEventListener("click",addToCart)
    event.target.addEventListener("click",removeFromCart)
    
    cartCounter.textContent = cart.length 
    console.log(cart)
    //console.log(event.target.getAttribute('data-id'))
}


function removeFromCart(event){
    const productId = event.target.getAttribute('data-id')

    //console.log(productId)

    cart.splice(cart.findIndex(p => p.id == productId), 1);
    //disable remove button
    event.target.textContent = "add to cart"
    event.target.removeEventListener("click",removeFromCart)
    event.target.addEventListener("click",addToCart)
    cartCounter.textContent = cart.length
    //console.log("item removed")
    //console.log(cart)
}


function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart))
    window.location.replace("./cart.html")
    console.log("cart saved")
}