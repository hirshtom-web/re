/* =========================
GLOBAL FILTER STATE
========================= */

const propertyFilters = {

    location:"",

    propertyType:"",

    completion:"",

    status:"",

    sort:"",

    minPrice:0,

    maxPrice:999999999

};





/* =========================
PRICE CONVERTER
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




    const match =
    text.match(/[\d,.]+/);



    if(!match){

        return 999999999;

    }




    let value =
    Number(
        match[0]
        .replace(",","")
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
INITIALIZE PRICE FILTER
========================= */

function initializePriceFilter(){


    if(!window.properties){

        return;

    }



    const prices =

    window.properties

    .map(property =>
        getPropertyPrice(property)
    )

    .filter(price =>
        price < 999999999
    );




    if(!prices.length){

        return;

    }





    const minPrice =
    Math.min(...prices);



    const maxPrice =
    Math.max(...prices);




    propertyFilters.minPrice =
    minPrice;


    propertyFilters.maxPrice =
    maxPrice;





    const minInput =
    document.getElementById("min-price");



    const maxInput =
    document.getElementById("max-price");



    const minRange =
    document.getElementById("min-range");



    const maxRange =
    document.getElementById("max-range");





    if(minInput){

        minInput.value =
        minPrice;

    }



    if(maxInput){

        maxInput.value =
        maxPrice;

    }






    [minRange,maxRange]
    .forEach(range=>{


        if(!range) return;



        range.min =
        minPrice;


        range.max =
        maxPrice;


    });





    if(minRange){

        minRange.value =
        minPrice;

    }




    if(maxRange){

        maxRange.value =
        maxPrice;

    }





    createPriceChart(prices);


}








/* =========================
PRICE GRAPH
========================= */

function createPriceChart(prices){


    const chart =
    document.querySelector(".price-chart");



    if(!chart) return;



    chart.innerHTML="";



    const buckets = 8;



    const min =
    Math.min(...prices);



    const max =
    Math.max(...prices);



    let values =
    Array(buckets)
    .fill(0);




    prices.forEach(price=>{


        let index =
        max === min
        ?
        0
        :
        Math.floor(
            ((price-min)/(max-min))
            *
            (buckets-1)
        );



        values[index]++;


    });





    const highest =
    Math.max(...values);



    values.forEach(value=>{


        const bar =
        document.createElement("div");



        bar.style.height =
        highest
        ?
        `${(value/highest)*100}%`
        :
        "0%";



        chart.appendChild(bar);


    });


}









/* =========================
FILTER ENGINE
========================= */

function filterProperties(){



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





    let filtered =

    window.properties.filter(property=>{





        /*
        SEARCH EVERYTHING
        */

        const searchableText =

        JSON.stringify(property)
        .toLowerCase();




        const searchMatch =

        !search

        ||

        searchableText.includes(search);







        /*
        LOCATION
        */

        const locationMatch =

        !propertyFilters.location

        ||

        searchableText.includes(
            propertyFilters.location.toLowerCase()
        );






        /*
        PROPERTY TYPE
        */

        const typeMatch =

        !propertyFilters.propertyType

        ||

        property.type ===
        propertyFilters.propertyType;







        /*
        STATUS
        */

        const statusMatch =

        !propertyFilters.status

        ||

        property.status ===
        propertyFilters.status;







        /*
        COMPLETION
        */

        let completionMatch=true;



        if(propertyFilters.completion){


            const year =
            Number(
                property.delivery
            );


            completionMatch =
            year <=
            Number(propertyFilters.completion);


        }







        /*
        PRICE
        */


        const price =

        getPropertyPrice(property);




        const priceMatch =

        price >=
        propertyFilters.minPrice

        &&

        price <=
        propertyFilters.maxPrice;








        return (

            searchMatch

            &&

            locationMatch

            &&

            typeMatch

            &&

            statusMatch

            &&

            completionMatch

            &&

            priceMatch

        );


    });








    /* =========================
       SORT
    ========================= */


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

                a.title.localeCompare(
                    b.title
                )

            );


        break;





        case "location":


            filtered.sort((a,b)=>

                (a.location||"")
                .localeCompare(
                    b.location||""
                )

            );


        break;


    }







    renderPropertiesGrid(filtered);





    if(window.updateMapMarkers){

        updateMapMarkers(filtered);

    }


}








/* =========================
SLIDER EVENTS
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





        document.getElementById(
            "min-price"
        ).value =
        propertyFilters.minPrice;




        document.getElementById(
            "max-price"
        ).value =
        propertyFilters.maxPrice;





        filterProperties();


    });


});








/* =========================
SEARCH EVENTS
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
LOAD
========================= */


window.addEventListener(
"propertiesLoaded",
()=>{

    initializePriceFilter();

    filterProperties();

});
