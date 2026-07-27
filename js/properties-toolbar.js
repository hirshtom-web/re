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


document.querySelectorAll(".filter-dropdown").forEach(dropdown => {


    const button = dropdown.querySelector(".filter-button");
    const popup = dropdown.querySelector(".filter-popup");
    const label = dropdown.querySelector(".filter-label");



    button.addEventListener("click", function(e){

        e.stopPropagation();


        // close other dropdowns

        document.querySelectorAll(".filter-popup.active")
        .forEach(activePopup => {

            if(activePopup !== popup){

                activePopup.classList.remove("active");

            }

        });


        document.querySelectorAll(".filter-button.active")
        .forEach(activeButton => {

            if(activeButton !== button){

                activeButton.classList.remove("active");

            }

        });



        popup.classList.toggle("active");

        button.classList.toggle("active");


    });





    dropdown.querySelectorAll(".popup-options button")
    .forEach(option => {


        option.addEventListener("click", function(){


            label.textContent = this.textContent;


            popup.classList.remove("active");

            button.classList.remove("active");



            let value = this.dataset.value;



            /*
            Connect your filters here:

            if(dropdown.id === "location-dropdown"){
                filterProperties(value);
            }

            if(dropdown.id === "property-type-dropdown"){
                filterProperties(value);
            }

            */


        });


    });


});





// Close when clicking outside

document.addEventListener("click", function(){


    document.querySelectorAll(".filter-popup.active")
    .forEach(popup => {

        popup.classList.remove("active");

    });


    document.querySelectorAll(".filter-button.active")
    .forEach(button => {

        button.classList.remove("active");

    });


});

const locationSearch =
document.getElementById("location-search");


locationSearch.addEventListener("input", function(){


    let search =
    this.value.toLowerCase();



    document.querySelectorAll(
    "#location-dropdown .popup-options button"
    )
    .forEach(button => {


        let text =
        button.textContent.toLowerCase();



        button.style.display =
        text.includes(search)
        ? "block"
        : "none";


    });


});
