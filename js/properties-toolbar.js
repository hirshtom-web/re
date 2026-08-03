/* =========================
PROPERTY TOOLBAR + FILTER ENGINE
========================= */


/* =========================
GLOBAL FILTER STATE
========================= */

window.propertyFilters = {

    location:"",
    propertyType:"",
    completion:"",
    status:"",
    sort:"",
    minPrice:0,
    maxPrice:999999999

};





/* =========================
PRICE READER
========================= */

function getPropertyPrice(property){

    if(property.priceValue){

        return Number(property.priceValue);

    }


    const text = (

        property.price ||
        property.priceRange ||
        ""

    ).toLowerCase();



    const match = text.match(/[\d,.]+/);



    if(!match){

        return 999999999;

    }



    let value = Number(
        match[0].replace(",","")
    );



    if(text.includes("m")){

        value *= 1000000;

    }
    else if(text.includes("k")){

        value *= 1000;

    }


    return value;

}





/* =========================
FILTER ENGINE
========================= */

window.filterProperties = function(){


    if(!window.properties){

        return;

    }



    const desktopSearch =
    document.getElementById(
        "property-search"
    );


    const mobileSearch =
    document.getElementById(
        "mobile-property-search"
    );



    const search = (

        desktopSearch?.value ||
        mobileSearch?.value ||
        ""

    )
    .toLowerCase();





    let filtered = window.properties.filter(property=>{


        const text =
        JSON.stringify(property)
        .toLowerCase();




        const searchMatch =

        !search ||

        text.includes(search);





        const locationMatch =

        !propertyFilters.location ||

        text.includes(
            propertyFilters.location.toLowerCase()
        );





        const typeMatch =

        !propertyFilters.propertyType ||

        property.type ===
        propertyFilters.propertyType;





        const completionMatch =

        !propertyFilters.completion ||

        Number(property.delivery) <=
        Number(propertyFilters.completion);





        const price =
        getPropertyPrice(property);




        const priceMatch =

        price >= propertyFilters.minPrice &&

        price <= propertyFilters.maxPrice;




        return (

            searchMatch &&
            locationMatch &&
            typeMatch &&
            completionMatch &&
            priceMatch

        );


    });





    switch(propertyFilters.sort){


        case "price-low":

            filtered.sort((a,b)=>

                getPropertyPrice(a)
                -
                getPropertyPrice(b)

            );

        break;



        case "price-high":

            filtered.sort((a,b)=>

                getPropertyPrice(b)
                -
                getPropertyPrice(a)

            );

        break;



        case "name":

            filtered.sort((a,b)=>

                (a.title || "")
                .localeCompare(
                    b.title || ""
                )

            );

        break;



        case "location":

            filtered.sort((a,b)=>

                (a.location || "")
                .localeCompare(
                    b.location || ""
                )

            );

        break;


    }





    if(window.renderPropertiesGrid){

        window.renderPropertiesGrid(filtered);

    }



    if(window.updateMapMarkers){

        window.updateMapMarkers(filtered);

    }


};







/* =========================
INITIALIZE TOOLBAR
========================= */

document.addEventListener(
"DOMContentLoaded",
()=>{





/* =========================
MOBILE DROPDOWNS
========================= */


document
.querySelectorAll(".mobile-filter-section")
.forEach(section=>{


    const button =
    section.querySelector(
        ".mobile-select-trigger"
    );


    const popup =
    section.querySelector(
        ".mobile-popup-options"
    );


    if(!button || !popup){

        return;

    }



    button.addEventListener(
    "click",
    (e)=>{


        e.stopPropagation();



        document
        .querySelectorAll(
            ".mobile-popup-options.active"
        )
        .forEach(open=>{


            if(open !== popup){

                open.classList.remove(
                    "active"
                );

            }


        });



        popup.classList.toggle(
            "active"
        );


    });






    popup
    .querySelectorAll(
        "button"
    )
    .forEach(option=>{


        option.addEventListener(
        "click",
        ()=>{


            const value =
            option.dataset.value || "";



            button
            .querySelector("span")
            .textContent =
            option.textContent.trim();





            const title =
            section
            .querySelector("h3")
            ?.textContent.trim();





            if(title === "Location"){

                propertyFilters.location=value;

            }



            if(title === "Property Type"){

                propertyFilters.propertyType=value;

            }



            if(title === "Completed By"){

                propertyFilters.completion=value;

            }



            if(title === "Sort By"){

                propertyFilters.sort=value;

            }




            popup.classList.remove(
                "active"
            );


            filterProperties();



        });


    });



});









/* =========================
SEARCH
========================= */


document
.getElementById(
    "property-search"
)
?.addEventListener(
    "input",
    filterProperties
);



document
.getElementById(
    "mobile-property-search"
)
?.addEventListener(
    "input",
    filterProperties
);









/* =========================
LOCATION SEARCH
========================= */


document
.getElementById(
    "location-search"
)
?.addEventListener(
"input",
function(){


    const value =
    this.value.toLowerCase();



    document
    .querySelectorAll(
        "#location-dropdown .popup-options button"
    )
    .forEach(button=>{


        button.style.display =

        button.textContent
        .toLowerCase()
        .includes(value)

        ?

        "block"

        :

        "none";


    });


});









/* =========================
PRICE
========================= */


document
.querySelector(
    ".apply-filter"
)
?.addEventListener(
"click",
()=>{


    filterProperties();


});




document
.querySelector(
    ".reset-filter"
)
?.addEventListener(
"click",
()=>{


    propertyFilters.minPrice = 0;

    propertyFilters.maxPrice = 999999999;


    filterProperties();


});









/* =========================
PRICE SLIDERS
========================= */


document
.querySelectorAll(
"#min-range,#max-range"
)
.forEach(slider=>{


    slider.addEventListener(
    "input",
    ()=>{


        propertyFilters.minPrice =

        Number(
            document.getElementById(
                "min-range"
            ).value
        );



        propertyFilters.maxPrice =

        Number(
            document.getElementById(
                "max-range"
            ).value
        );



        filterProperties();


    });


});








/* =========================
CLOSE DROPDOWNS
========================= */


document.addEventListener(
"click",
()=>{


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


});






console.log(
"PROPERTY TOOLBAR READY"
);



});







/* =========================
AFTER DATA LOAD
========================= */


window.addEventListener(
"propertiesLoaded",
()=>{

    filterProperties();

});
