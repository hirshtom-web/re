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


const dropdown = document.getElementById("location-dropdown");
const button = document.getElementById("location-button");
const popup = dropdown.querySelector(".filter-popup");
const label = dropdown.querySelector(".filter-label");

button.addEventListener("click", () => {

    popup.classList.toggle("active");
    button.classList.toggle("active");

});

popup.querySelectorAll("button").forEach(option => {

    option.addEventListener("click", () => {

        label.textContent = option.textContent;

        popup.classList.remove("active");
        button.classList.remove("active");

        // your filter function
        filterProperties(option.dataset.value);

    });

});

document.addEventListener("click", e => {

    if(!dropdown.contains(e.target)){

        popup.classList.remove("active");
        button.classList.remove("active");

    }

});

const search = document.getElementById("location-search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    popup.querySelectorAll(".popup-options button").forEach(btn => {

        btn.style.display =
            btn.textContent.toLowerCase().includes(value)
                ? "block"
                : "none";

    });

});
