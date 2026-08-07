/* =========================
GLOBAL FILTER STATE
========================= */

window.propertyFilters = {

    location:"",
    propertyType:"",
    completion:"",
    sort:"",
    search:""

};




/* =========================
MAIN FILTER ENGINE
========================= */

function filterProperties(){


    if(!window.properties){

        return;

    }



    let filtered =

    window.properties.filter(property=>{



        let searchMatch = true;

        let locationMatch = true;

        let typeMatch = true;

        let completionMatch = true;




        /*
        SEARCH
        */

        if(propertyFilters.search){


            const text =

            JSON.stringify(property)
            .toLowerCase();



            searchMatch =

            text.includes(
                propertyFilters.search
            );


        }





        /*
        LOCATION
        */

        if(propertyFilters.location){


            locationMatch =

            property.location ===
            propertyFilters.location;


        }





        /*
        PROPERTY TYPE
        */

        if(propertyFilters.propertyType){


            typeMatch =

property.propertyType === propertyFilters.propertyType


        }





        /*
        COMPLETION
        */

        if(propertyFilters.completion){


            completionMatch =

            property.status ===
            propertyFilters.completion;


        }





        return (

            searchMatch &&

            locationMatch &&

            typeMatch &&

            completionMatch

        );


    });







    /*
    SORT
    */

    switch(propertyFilters.sort){


        case "price-low":


            filtered.sort((a,b)=>

                (a.priceValue || 0)
                -
                (b.priceValue || 0)

            );

        break;




        case "price-high":


            filtered.sort((a,b)=>

                (b.priceValue || 0)
                -
                (a.priceValue || 0)

            );

        break;




        case "name":


            filtered.sort((a,b)=>

                a.title.localeCompare(
                    b.title
                )

            );

        break;


    }





    /*
    UPDATE GRID
    */

    if(window.renderPropertiesGrid){

        renderPropertiesGrid(filtered);

    }





    /*
    UPDATE MAP
    */

    if(window.updateMapMarkers){

        updateMapMarkers(filtered);

    }



}



window.filterProperties =
filterProperties;








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
    function(){


        propertyFilters.search =

        this.value
        .toLowerCase()
        .trim();



        filterProperties();


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


            desktopSearch.dispatchEvent(
                new Event("input")
            );


        }



    });


}

function buildDynamicFilters(){

    const citySelect = document.getElementById("city-filter");
    const typeSelect = document.getElementById("type-filter");

    if(citySelect){

        const cities = [
            ...new Set(
                window.properties.map(p=>p.city)
            )
        ].sort();


        cities.forEach(city=>{

            citySelect.innerHTML += `
                <option value="${city}">
                    ${city}
                </option>
            `;

        });

    }


    if(typeSelect){

        const types = [
            ...new Set(
                window.properties.map(p=>p.propertyType)
            )
        ].sort();


        types.forEach(type=>{

            typeSelect.innerHTML += `
                <option value="${type}">
                    ${type}
                </option>
            `;

        });

    }

}
