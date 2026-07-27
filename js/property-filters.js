/* =========================
PROPERTY TOOLBAR FILTERS
========================= */


/* =========================
PRICE BUTTON
========================= */

const priceButton =
document.getElementById("price-filter");


const pricePopup =
document.querySelector(".price-popup");



if(priceButton && pricePopup){


    priceButton.addEventListener(
    "click",
    (e)=>{


        e.stopPropagation();


        pricePopup.classList.toggle(
            "active"
        );


    });


}







/* =========================
ALL DROPDOWNS
========================= */


document
.querySelectorAll(".filter-dropdown")
.forEach(dropdown=>{


    const button =
    dropdown.querySelector(
        ".filter-button"
    );


    const popup =
    dropdown.querySelector(
        ".filter-popup"
    );


    const label =
    dropdown.querySelector(
        ".filter-label"
    );



    if(!button || !popup){

        return;

    }





    button.addEventListener(
    "click",
    function(e){


        e.stopPropagation();



        // close other dropdowns

        document
        .querySelectorAll(
            ".filter-popup.active"
        )
        .forEach(active=>{


            if(active !== popup){

                active.classList.remove(
                    "active"
                );

            }


        });




        document
        .querySelectorAll(
            ".filter-button.active"
        )
        .forEach(active=>{


            if(active !== button){

                active.classList.remove(
                    "active"
                );

            }


        });





        popup.classList.toggle(
            "active"
        );


        button.classList.toggle(
            "active"
        );



    });








    /* =========================
       OPTION CLICK
    ========================= */


    popup
    .querySelectorAll(
        ".popup-options button"
    )
    .forEach(option=>{


        option.addEventListener(
        "click",
        function(e){



            e.stopPropagation();



            const value =
            this.dataset.value ||
            this.textContent.trim();




            /*
            UPDATE BUTTON LABEL
            */

            if(label){

                label.textContent =
                this.textContent;

            }







            /*
            SAVE FILTER VALUE
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





            if(dropdown.id === "status-dropdown"){


                propertyFilters.status =
                value;


            }





            if(dropdown.id === "sort-dropdown"){


                propertyFilters.sort =
                value;


            }







            /*
            CLOSE MENU
            */


            popup.classList.remove(
                "active"
            );


            button.classList.remove(
                "active"
            );






            /*
            AUTO UPDATE RESULTS
            */


            if(window.filterProperties){

                filterProperties();

            }



        });


    });



});








/* =========================
CLOSE EVERYTHING OUTSIDE
========================= */


document.addEventListener(
"click",
function(e){



    document
    .querySelectorAll(
        ".filter-popup.active"
    )
    .forEach(popup=>{


        popup.classList.remove(
            "active"
        );


    });



    document
    .querySelectorAll(
        ".filter-button.active"
    )
    .forEach(button=>{


        button.classList.remove(
            "active"
        );


    });






    if(
        pricePopup &&
        priceButton &&
        !priceButton.contains(e.target) &&
        !pricePopup.contains(e.target)
    ){

        pricePopup.classList.remove(
            "active"
        );


    }



});








/* =========================
LOCATION SEARCH INSIDE MENU
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
        this.value
        .toLowerCase();




        document
        .querySelectorAll(
            "#location-dropdown .popup-options button"
        )
        .forEach(button=>{


            const text =
            button.textContent
            .toLowerCase();




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
DEBUG
========================= */


console.log(
"PROPERTY TOOLBAR FILTERS LOADED"
);
