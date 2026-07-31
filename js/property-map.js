// ======================================
// PROPERTY MAP CONTROLLER
// ======================================

let propertyMap;
let AdvancedMarkerElement;


// ======================================
// WAIT FOR PROPERTY THEN INIT MAP
// ======================================

async function initPropertyMap(){


    console.log(
        "MAP INIT WAITING..."
    );


    let attempts = 0;


    while(
        !window.currentProperty &&
        attempts < 50
    ){

        await new Promise(
            resolve => setTimeout(resolve,100)
        );

        attempts++;

    }



    const property =
        window.currentProperty;



    console.log(
        "MAP PROPERTY:",
        property
    );



    if(
        !property ||
        !property.coordinates
    ){

        console.error(
            "Property coordinates missing"
        );

        return;

    }



    const { AdvancedMarkerElement: MarkerClass } =
        await google.maps.importLibrary("marker");


    AdvancedMarkerElement =
        MarkerClass;



    propertyMap =
    new google.maps.Map(

        document.getElementById("property-map"),

        {

            center:{
                lat:Number(property.coordinates.lat),
                lng:Number(property.coordinates.lng)
            },

            zoom:17,

            mapId:
            "d44ebce34f2241f5985860cf",


            mapTypeControl:false,
            streetViewControl:false,
            fullscreenControl:false,
            rotateControl:false

        }

    );



    addMainProperty();



    console.log(
        "MAP READY"
    );

}



// ======================================
// MAIN PROPERTY MARKER
// ======================================


function addMainProperty(){


    const property =
        window.currentProperty;



    const pin =
        document.createElement("div");


    pin.className =
        "price-marker";


    pin.innerText =
        property.price || "Price";



    new AdvancedMarkerElement({

        map:propertyMap,


        position:{

            lat:Number(
                property.coordinates.lat
            ),

            lng:Number(
                property.coordinates.lng
            )

        },


        content:pin,


        title:
        property.title

    });



    console.log(
        "MAIN MARKER:",
        property.title
    );

}



// ======================================
// OPTIONAL NEARBY MARKERS
// ======================================


function addNearbyProperties(){

    console.log(
        "Nearby markers disabled until coordinates exist"
    );

}



// ======================================

window.initPropertyMap =
initPropertyMap;
