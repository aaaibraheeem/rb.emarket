const checkoutForm = document.getElementById("checkout-form")
const userEmail = document.getElementById("user-email")
const userPassword = document.getElementById("user-password")
const succesMessage = document.getElementById("success")
const errorMessage = document.getElementById("error")

checkoutForm.addEventListener("submit",(e) => {
    e.preventDefault()
    if(isEmail(userEmail.value) && userPassword.value == "123456789"){
        succesMessage.style.display = "block"
        errorMessage.style.display = "none"
        checkoutForm.style.display = "none"
    }
    else{
        errorMessage.style.display = "block"
    }
})


function isEmail(email){
    return true
}