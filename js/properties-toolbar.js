/* =========================
FILTER TOOLBAR CONTROLLER
========================= */


/* =========================
CREATE GLOBAL FILTER STATE
========================= */

window.propertyFilters = window.propertyFilters || {

    location:"",
    propertyType:"",
    completion:"",
    status:"",
    sort:"",
    minPrice:0,
    maxPrice:999999999

};



/* =========================
GENERAL DROPDOWNS
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



    if(!button || !popup){

        return;

    }



    button.addEventListener("click",(e)=>{


        e.stopPropagation();



        document
        .querySelectorAll(".filter-popup.active")
        .forEach(open=>{


            if(open !== popup){

                open.classList.remove("active");

            }


        });



        document
        .querySelectorAll(".filter-button.active")
        .forEach(active=>{


            if(active !== button){

                active.classList.remove("active");

            }


        });



        popup.classList.toggle("active");

        button.classList.toggle("active");


    });






    popup
    .querySelectorAll(".popup-options button")
    .forEach(option=>{


        option.addEventListener("click",()=>{


            const value =
            option.dataset.value || "";



            if(label){

                label.textContent =
                option.textContent.trim();

            }





            if(dropdown.id==="location-dropdown"){

                propertyFilters.location=value;

            }


            if(dropdown.id==="property-type-dropdown"){

                propertyFilters.propertyType=value;

            }


            if(dropdown.id==="completion-dropdown"){

                propertyFilters.completion=value;

            }


            if(dropdown.id==="sort-dropdown"){

                propertyFilters.sort=value;

            }




            popup.classList.remove("active");

            button.classList.remove("active");





            if(window.filterProperties){

                filterProperties();

            }


        });


    });


});









/* =========================
PRICE BUTTON
========================= */


const priceDropdown =
document.getElementById(
"price-dropdown"
);


if(priceDropdown){


    const priceButton =
    priceDropdown.querySelector(".filter-button");


    const pricePopup =
    priceDropdown.querySelector(".filter-popup");



    if(priceButton && pricePopup){


        priceButton.addEventListener("click",(e)=>{


            e.stopPropagation();


            pricePopup.classList.toggle("active");

            priceButton.classList.toggle("active");


        });


    }


}










/* =========================
LOCATION SEARCH
========================= */


const toolbarLocationSearch =
document.getElementById(
"location-search"
);



if(toolbarLocationSearch){


    toolbarLocationSearch.addEventListener(
    "input",
    function(){


        const search =
        this.value.toLowerCase();



        document
        .querySelectorAll(
        "#location-dropdown .popup-options button"
        )
        .forEach(button=>{


            button.style.display =

            button.textContent
            .toLowerCase()
            .includes(search)

            ?

            "block"

            :

            "none";


        });


    });


}








/* =========================
CLOSE OUTSIDE
========================= */


document.addEventListener(
"click",
()=>{


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






console.log(
"PROPERTY TOOLBAR LOADED"
);
