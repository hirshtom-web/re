const priceButton =
document.getElementById("price-filter");


const pricePopup =
document.querySelector(".price-popup");



priceButton.addEventListener("click",()=>{


    pricePopup.classList.toggle("active");


});
