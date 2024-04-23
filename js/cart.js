const cartCounter = document.getElementById("cart-counter")

const cartTableBody = document.getElementById("cart-table-body")

const cartTable = document.getElementById("cart-table")

const options = document.getElementById("options")

const totalView = document.getElementById("total")

const messageDiv = document.getElementById("message-div")

const cancelBtn = document.getElementById("cancel-btn")
cancelBtn.addEventListener("click",() => {
    window.location.href ="products.html"
})

const checkOutBtn = document.getElementById("checkout-btn")
checkOutBtn.addEventListener("click",() => {
    window.location.href ="checkout.html"
})

const items = JSON.parse(localStorage.getItem("cart"))

calculateTotal()

document.addEventListener("DOMContentLoaded", function(){
   if(items.length<=0){
    showEmptyCartMessage()
   }
});


if(items!==null){
    cartCounter.textContent = items.length
    items.forEach( (item,index) => {
        const tr = document.createElement("tr")
        const th = document.createElement("th")
        th.setAttribute("scope","row")
        th.textContent = index + 1
        const td1 = document.createElement("td")
        td1.textContent = item.name
        const td2 = document.createElement("td")
        td2.textContent = item.price
        const td3 = document.createElement("input")
        td3.setAttribute("type","number")
        td3.setAttribute("min","1")
        td3.setAttribute("value",item.quantity)
        td3.addEventListener("change",(e)=>{
            let quantity = e.target.value
            if(quantity<=0){
                //check negative input and set default value to 1
                quantity == 1
                e.target.value =1
            }
            // td4 is the total for single item
            td4.textContent = e.target.value * item.price
            updateQuantity(index,e.target.value)
        })
        const td4 = document.createElement("td")
        td4.textContent = item.quantity * item.price
        const td5 = document.createElement("a")
        td5.textContent = "حذف من السلة"
        td5.style.cursor= "pointer"
        td5.style.color= "red"
        td5.setAttribute("data-id",item.id)
        td5.addEventListener("click",(e)=>{
            e.preventDefault()
            items.splice(items.findIndex(item => item.id == e.target.getAttribute("data-id")), 1);
            calculateTotal()
            removeRow(e.target.parentElement)
        })
        tr.append(th,td1,td2,td3,td4,td5)
        cartTableBody.appendChild(tr)
    })
}


function removeRow(row){
    row.style.display = 'none';
    //console.log(items.length)
    cartCounter.textContent = items.length
    //check if items array is empty
    if(items.length<=0){
        showEmptyCartMessage()
    }
}

function showEmptyCartMessage(){
    cartTable.style.display ="none"
    options.style.display ="none"
    messageDiv.style.display= "block"
}

function updateQuantity(index,quantity){
    items[index].quantity = quantity
    calculateTotal()
}


function calculateTotal(){
    const total = items.reduce(
        (accumulator, item) => accumulator + item.quantity*item.price,
        0,
      );
    totalView.textContent = "Total Price is: " +total+ " SP"
}