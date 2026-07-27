/* =========================
PRICE FILTER POPUP
========================= */

const priceButton =
document.getElementById("price-filter");


const pricePopup =
document.querySelector(".price-popup");



if(priceButton && pricePopup){


    priceButton.addEventListener("click", (e)=>{

        e.stopPropagation();

        pricePopup.classList.toggle("active");

    });


}



document.addEventListener("click",(e)=>{


    // page does not have price filter
    if(!priceButton || !pricePopup){

        return;

    }



    if(
        !priceButton.contains(e.target) &&
        !pricePopup.contains(e.target)
    ){

        pricePopup.classList.remove("active");

    }


});





/* =========================
GENERAL FILTER DROPDOWNS
========================= */


document.querySelectorAll(".filter-dropdown")
.forEach(dropdown=>{


    const button =
    dropdown.querySelector(".filter-button");


    const popup =
    dropdown.querySelector(".filter-popup");


    const label =
    dropdown.querySelector(".filter-label");



    if(!button || !popup){

        return;

    }





    button.addEventListener("click",(e)=>{


        e.stopPropagation();



        document
        .querySelectorAll(".filter-popup.active")
        .forEach(activePopup=>{


            if(activePopup !== popup){

                activePopup.classList.remove("active");

            }


        });




        document
        .querySelectorAll(".filter-button.active")
        .forEach(activeButton=>{


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


        label.textContent =
        this.textContent;



        popup.classList.remove("active");

        button.classList.remove("active");



        const value =
        this.dataset.value || "";





        /* =========================
           CONNECT FILTERS
        ========================= */



        if(dropdown.id === "location-dropdown"){

            propertyFilters.location =
            value;

        }



        if(dropdown.id === "property-type-dropdown"){

            propertyFilters.propertyType =
            value;

        }



        if(dropdown.id === "completion-dropdown"){

            propertyFilters.completion =
            value;

        }



        if(dropdown.id === "sort-dropdown"){

            propertyFilters.sort =
            value;

        }





        filterProperties();



    });


});







/* =========================
CLOSE FILTER POPUPS
========================= */


document.addEventListener("click",()=>{


    document
    .querySelectorAll(".filter-popup.active")
    .forEach(popup=>{


        popup.classList.remove("active");


    });



    document
    .querySelectorAll(".filter-button.active")
    .forEach(button=>{


        button.classList.remove("active");


    });


});







/* =========================
LOCATION SEARCH INSIDE POPUP
========================= */


const locationSearch =
document.getElementById("location-search");



if(locationSearch){


    locationSearch.addEventListener("input",function(){


        const search =
        this.value.toLowerCase();



        document
        .querySelectorAll(
        "#location-dropdown .popup-options button"
        )
        .forEach(button=>{


            const text =
            button.textContent.toLowerCase();



            button.style.display =

            text.includes(search)

            ?

            "block"

            :

            "none";


        });


    });


}
