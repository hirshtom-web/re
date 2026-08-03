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



    const searchInput =
    document.getElementById(
        "property-search"
    );


    const search =
    searchInput
    ?
    searchInput.value.toLowerCase()
    :
    "";



    const filtered =
    window.properties.filter(property=>{


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
        property.type === propertyFilters.propertyType;



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




    if(propertyFilters.sort==="price-low"){

        filtered.sort((a,b)=>
            getPropertyPrice(a) -
            getPropertyPrice(b)
        );

    }



    if(propertyFilters.sort==="price-high"){

        filtered.sort((a,b)=>
            getPropertyPrice(b) -
            getPropertyPrice(a)
        );

    }



    if(propertyFilters.sort==="name"){

        filtered.sort((a,b)=>
            (a.title||"")
            .localeCompare(b.title||"")
        );

    }




    if(window.renderPropertiesGrid){

        window.renderPropertiesGrid(filtered);

    }



    if(window.updateMapMarkers){

        window.updateMapMarkers(filtered);

    }


};






/* =========================
DESKTOP DROPDOWNS
========================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


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
    e=>{


        e.stopPropagation();



        document
        .querySelectorAll(
            ".filter-popup.active"
        )
        .forEach(item=>{

            if(item!==popup){

                item.classList.remove(
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





    popup
    .querySelectorAll(
        ".popup-options button"
    )
    .forEach(option=>{


        option.addEventListener(
        "click",
        ()=>{


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



            popup.classList.remove(
                "active"
            );


            button.classList.remove(
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






/* =========================
CLOSE POPUPS
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
"DESKTOP PROPERTY TOOLBAR READY"
);


});





window.addEventListener(
"propertiesLoaded",
()=>{

    filterProperties();

});
