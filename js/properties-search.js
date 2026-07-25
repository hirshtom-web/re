/* ==========================================
   PROPERTY SEARCH + FILTER + SORT
========================================== */


function filterProperties(){


    const searchInput =
    document.getElementById("property-search");


    const locationFilter =
    document.getElementById("location-filter");


    const sortFilter =
    document.getElementById("property-sort");



    if(!searchInput || !locationFilter){

        console.warn("Search elements missing");
        return;

    }



    const search =
    searchInput.value
    .trim()
    .toLowerCase();



    const location =
    locationFilter.value;



    let filtered =
    (window.properties || []).filter(property=>{


        const title =
        (property.title || "")
        .toLowerCase();



        const propertyLocation =
        (property.location || "")
        .toLowerCase();



        const neighborhood =
        (property.neighborhood || "")
        .toLowerCase();



        const textMatch =

        title.includes(search)

        ||

        propertyLocation.includes(search)

        ||

        neighborhood.includes(search);



        const locationMatch =

        !location

        ||

        propertyLocation.includes(
            location.toLowerCase()
        );



        return textMatch && locationMatch;


    });



    /* =========================
       SORTING
    ========================= */


    if(sortFilter){


        switch(sortFilter.value){


            case "price-low":

                filtered.sort((a,b)=>{

                    return (
                        a.priceValue || 0
                    )
                    -
                    (
                        b.priceValue || 0
                    );

                });

            break;



            case "price-high":

                filtered.sort((a,b)=>{

                    return (
                        b.priceValue || 0
                    )
                    -
                    (
                        a.priceValue || 0
                    );

                });

            break;



            case "name":

                filtered.sort((a,b)=>{

                    return (
                        a.title || ""
                    )
                    .localeCompare(
                        b.title || ""
                    );

                });

            break;


        }

    }



    console.log(
        "FILTER RESULTS:",
        filtered.length
    );



    renderPropertiesGrid(filtered);


}





/* ==========================================
   EVENT LISTENERS
========================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    const searchInput =
    document.getElementById(
        "property-search"
    );


    const locationFilter =
    document.getElementById(
        "location-filter"
    );


    const sortFilter =
    document.getElementById(
        "property-sort"
    );



    if(searchInput){

        searchInput.addEventListener(
            "input",
            filterProperties
        );

    }



    if(locationFilter){

        locationFilter.addEventListener(
            "change",
            filterProperties
        );

    }



    if(sortFilter){

        sortFilter.addEventListener(
            "change",
            filterProperties
        );

    }


});
