/* =========================
PROPERTY SEARCH
========================= */


const propertySearch =
document.getElementById("property-search");



if(propertySearch){


    propertySearch.addEventListener(
    "input",
    function(){


        const search =
        this.value
        .toLowerCase()
        .trim();



        const filtered =

        window.properties.filter(property=>{


            if(!search){

                return true;

            }



            const searchable =

            JSON.stringify(property)
            .toLowerCase();



            return searchable.includes(search);


        });




        // update cards

        if(window.renderPropertiesGrid){

            renderPropertiesGrid(filtered);

        }





        // update map

        if(window.updateMapMarkers){

            updateMapMarkers(filtered);

        }



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



        desktopSearch?.dispatchEvent(
            new Event("input")
        );


    });


}
