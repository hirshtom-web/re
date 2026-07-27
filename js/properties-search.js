/* =========================
GLOBAL FILTER STATE
========================= */

const propertyFilters = {

    location:"",

    propertyType:"",

    completion:"",

    sort:"",

    minPrice:0,

    maxPrice:999999999

};





/* =========================
PRICE FILTER INITIALIZE
========================= */

function initializePriceFilter(){


    if(!window.properties) return;



    const prices =
    window.properties
    .map(p=>p.priceValue)
    .filter(Boolean);



    if(!prices.length) return;



    const minPrice =
    Math.min(...prices);



    const maxPrice =
    Math.max(...prices);




    propertyFilters.minPrice =
    minPrice;


    propertyFilters.maxPrice =
    maxPrice;




    document.getElementById("min-price").value =
    minPrice;



    document.getElementById("max-price").value =
    maxPrice;





    const minRange =
    document.getElementById("min-range");


    const maxRange =
    document.getElementById("max-range");



    if(minRange && maxRange){


        minRange.min =
        minPrice;


        minRange.max =
        maxPrice;


        minRange.value =
        minPrice;



        maxRange.min =
        minPrice;


        maxRange.max =
        maxPrice;


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



    chart.innerHTML = "";



    const buckets = 8;


    const min =
    Math.min(...prices);


    const max =
    Math.max(...prices);



    let distribution =
    Array(buckets).fill(0);



    prices.forEach(price=>{


        let index =
        Math.floor(
            ((price-min)/(max-min))
            *
            (buckets-1)
        );


        distribution[index]++;


    });



    const highest =
    Math.max(...distribution);



    distribution.forEach(value=>{


        const bar =
        document.createElement("div");


        bar.style.height =
        (
            value / highest * 100
        ) + "%";


        chart.appendChild(bar);


    });


}





/* =========================
FILTER ENGINE
========================= */

function filterProperties(){


    const searchInput =
    document.getElementById("property-search");



    let search =
    searchInput
    ?
    searchInput.value.toLowerCase()
    :
    "";



    let filtered =
    window.properties.filter(property=>{


        const title =
        (property.title || "")
        .toLowerCase();



        const loc =
        (property.location || "")
        .toLowerCase();



        const neighborhood =
        (property.neighborhood || "")
        .toLowerCase();




        const textMatch =

        title.includes(search)

        ||

        loc.includes(search)

        ||

        neighborhood.includes(search);




        const locationMatch =

        !propertyFilters.location

        ||

        loc.includes(
            propertyFilters.location.toLowerCase()
        );




        const priceMatch =

        property.priceValue >=
        propertyFilters.minPrice

        &&

        property.priceValue <=
        propertyFilters.maxPrice;




        return (

            textMatch

            &&

            locationMatch

            &&

            priceMatch

        );


    });





    switch(propertyFilters.sort){


        case "price-low":

            filtered.sort((a,b)=>
                a.priceValue-b.priceValue
            );

        break;



        case "price-high":

            filtered.sort((a,b)=>
                b.priceValue-a.priceValue
            );

        break;



        case "name":

            filtered.sort((a,b)=>
                a.title.localeCompare(b.title)
            );

        break;


    }





    renderPropertiesGrid(filtered);



    if(window.updateMapMarkers){

        updateMapMarkers(filtered);

    }


}

document
.querySelectorAll("#min-range,#max-range")
.forEach(slider=>{


    slider.addEventListener("input",()=>{


        propertyFilters.minPrice =
        Number(
            document.getElementById("min-range").value
        );


        propertyFilters.maxPrice =
        Number(
            document.getElementById("max-range").value
        );



        document.getElementById("min-price").value =
        propertyFilters.minPrice;


        document.getElementById("max-price").value =
        propertyFilters.maxPrice;



        filterProperties();


    });


});



window.addEventListener(
"propertiesLoaded",
initializePriceFilter
);

