/* =========================
FILTER TOOLBAR CONTROLLER
========================= */


/* =========================
GLOBAL FILTER STATE BRIDGE
========================= */


window.propertyFilters =
window.propertyFilters || {

    location:"",
    propertyType:"",
    completion:"",
    status:"",
    sort:"",
    minPrice:0,
    maxPrice:999999999

};


const propertyFilters =
window.propertyFilters;



/* =========================
GENERAL FILTER DROPDOWNS
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


        option.addEventListener("click",function(e){


            e.stopPropagation();



            const value =
            this.dataset.value || "";



            if(label){

                label.textContent =
                this.textContent;

            }



            popup.classList.remove("active");

            button.classList.remove("active");





            /*
            SAVE FILTER VALUES
            */


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





            /*
            UPDATE RESULTS
            */


            if(window.filterProperties){

                window.filterProperties();

            }



        });


    });



});









/* =========================
PRICE ACTIONS
========================= */


const priceApply =
document.querySelector(".apply-filter");


const priceReset =
document.querySelector(".reset-filter");




if(priceApply){


    priceApply.addEventListener("click",()=>{


        if(window.filterProperties){

            window.filterProperties();

        }


        document
        .querySelector(".price-popup")
        ?.classList.remove("active");


    });


}





if(priceReset){


    priceReset.addEventListener("click",()=>{


        if(window.initializePriceFilter){

            window.initializePriceFilter();

        }


        if(window.filterProperties){

            window.filterProperties();

        }


    });


}









/* =========================
CLOSE POPUPS
========================= */


document.addEventListener("click",(e)=>{


    document
    .querySelectorAll(".filter-dropdown")
    .forEach(dropdown=>{


        if(!dropdown.contains(e.target)){


            dropdown
            .querySelector(".filter-popup")
            ?.classList.remove("active");



            dropdown
            .querySelector(".filter-button")
            ?.classList.remove("active");


        }


    });


});









/* =========================
LOCATION SEARCH
========================= */


const locationSearch =
document.getElementById(
"location-search"
);



if(locationSearch){


    locationSearch.addEventListener(
    "input",
    function(){


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









/* =========================
MOBILE SEARCH SYNC
========================= */


const mobileSearch =
document.getElementById(
"mobile-property-search"
);



if(mobileSearch){


    mobileSearch.addEventListener(
    "input",
    function(){


        const desktopSearch =
        document.getElementById(
        "property-search"
        );



        if(desktopSearch){


            desktopSearch.value =
            this.value;


        }



        if(window.filterProperties){

            window.filterProperties();

        }



    });


}









/* =========================
DESKTOP SEARCH
========================= */


const propertySearch =
document.getElementById(
"property-search"
);



if(propertySearch){


    propertySearch.addEventListener(
    "input",
    ()=>{


        if(window.filterProperties){

            window.filterProperties();

        }


    });


}









/* =========================
LOAD AFTER DATA
========================= */


window.addEventListener(
"propertiesLoaded",
()=>{


    if(window.initializePriceFilter){

        window.initializePriceFilter();

    }



    if(window.filterProperties){

        window.filterProperties();

    }



});






console.log(
"PROPERTY TOOLBAR LOADED"
);
