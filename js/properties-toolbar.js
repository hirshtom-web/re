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
FILTER DROPDOWNS
========================= */


document
.querySelectorAll(".filter-dropdown")
.forEach(dropdown=>{


    const button =
    dropdown.querySelector(".filter-button");


    const popup =
    dropdown.querySelector(".filter-popup");


    const label =
    dropdown.querySelector(".filter-label");



    if(!button || !popup || !label){

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








    popup
    .querySelectorAll(".popup-options button")
    .forEach(option=>{


        option.addEventListener("click",()=>{


            label.textContent =
            option.textContent;



            popup.classList.remove("active");


            button.classList.remove("active");



            const value =
            option.dataset.value;



            /*
            CONNECT FILTERS HERE

            Example:

            if(dropdown.id === "location-dropdown"){

                propertyFilters.location = value;

            }


            filterProperties();

            */


        });


    });



});








/* =========================
CLOSE ALL FILTERS
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
