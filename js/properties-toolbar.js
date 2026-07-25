const priceButton = document.getElementById("price-filter");

const pricePopup = document.querySelector(".price-popup");


if(priceButton && pricePopup){


    priceButton.addEventListener("click", ()=>{


        pricePopup.classList.toggle("active");


    });


}

document.addEventListener("click",(e)=>{


    if(
        !priceButton.contains(e.target) &&
        !pricePopup.contains(e.target)
    ){

        pricePopup.classList.remove("active");

    }


});
