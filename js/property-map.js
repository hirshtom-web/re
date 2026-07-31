// ======================================
// PROPERTY MAP CONTROLLER
// ======================================

let propertyMap;

let AdvancedMarkerElement;



// ======================================
// INIT MAP
// ======================================

async function initPropertyMap(){

    console.log(
        "MAP PROPERTY:",
        window.currentProperty
    );


    if(
        !window.currentProperty ||
        !window.currentProperty.coordinates
    ){

        console.error(
            "Property coordinates missing"
        );

        return;

    }


    const { AdvancedMarkerElement: MarkerClass } =
        await google.maps.importLibrary("marker");


    AdvancedMarkerElement = MarkerClass;



    propertyMap =
    new google.maps.Map(

        document.getElementById("property-map"),

        {

            center:{
    lat:Number(window.currentProperty.coordinates.lat),
    lng:Number(window.currentProperty.coordinates.lng)
},

            zoom:17,

            mapId:"d44ebce34f2241f5985860cf",


            mapTypeControl:false,

            streetViewControl:false,

            fullscreenControl:false,

            rotateControl:false,



        }

    );


    addMainProperty();

addNearbyProperties();


}



// ======================================
// PRICE PILL
// ======================================

function createPricePill(value){


    const pill =
    document.createElement("div");


    pill.className =
    "price-marker";


    let text =
    value || "Price";


    const from =
    /^from\s+/i.test(text);


    text =
    text.replace(/^from\s+/i,"");


    if(from){

        text += "+";

    }


    pill.innerText = text;


    return pill;

}




// ======================================
// MAIN PROPERTY
// ======================================

function addMainProperty(){

    const property = window.currentProperty;

    if(!property?.coordinates){
        console.warn("No property coordinates");
        return;
    }


    const pin = document.createElement("div");

    pin.className = "price-marker";

    pin.innerText =
        property.price || "Price";


    new AdvancedMarkerElement({

        map: propertyMap,

        position:{
            lat:Number(property.coordinates.lat),
            lng:Number(property.coordinates.lng)
        },

        content:pin,

        title:property.title

    });


    console.log(
        "MAIN PROPERTY MARKER:",
        property.title
    );

}



// ======================================
// SOLD
// ======================================

function addSoldProperties(){


    soldProperties.forEach(property=>{


        new AdvancedMarkerElement({

            map:propertyMap,

            position:{
                lat:property.lat,
                lng:property.lng
            },

            title:property.title,

            content:createPricePill(property.price)

        });


    });


}




// ======================================
// DEVELOPMENTS
// ======================================

function addNearbyProperties(){

    const nearbyProperties =
    window.currentProperty?.nearby || [];


    nearbyProperties.forEach(property=>{


        const marker =
        new AdvancedMarkerElement({

            map:propertyMap,

            position:{
                lat:property.lat,
                lng:property.lng
            },

            title:property.title,

            content:createPricePill(property.price)

        });



        const info =
        new google.maps.InfoWindow({

            content:`

            <div>

                <h4>${property.title}</h4>

                <p>${property.status}</p>

                <strong>${property.price}</strong>

            </div>

            `

        });



        marker.addEventListener(

            "gmp-click",

            ()=>{

                info.open({

                    map:propertyMap,

                    anchor:marker

                });

            }

        );


    });


}




// ======================================
// POI
// ======================================

function addPointsOfInterest(){


    pointsOfInterest.forEach(place=>{


        new AdvancedMarkerElement({

            map:propertyMap,

            position:{
                lat:place.lat,
                lng:place.lng
            },

            title:place.name,

            content:createPricePill(place.name)

        });


    });


}

window.initPropertyMap = initPropertyMap;
