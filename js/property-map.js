// ======================================
// PROPERTY MAP CONTROLLER
// ======================================

let propertyMap = null;
let AdvancedMarkerElement = null;


// ======================================
// INIT MAP
// ======================================

async function initPropertyMap(){


    console.log(
        "MAP PROPERTY:",
        window.currentProperty
    );


    const property =
        window.currentProperty;


    if(
        !property ||
        !property.coordinates
    ){

        console.error(
            "Property coordinates missing"
        );

        return;

    }



    // Load Advanced Marker library

    const {
        AdvancedMarkerElement: MarkerClass
    } =
    await google.maps.importLibrary("marker");


    AdvancedMarkerElement =
        MarkerClass;



    const mapElement =
        document.getElementById(
            "property-map"
        );


    if(!mapElement){

        console.error(
            "Map container missing"
        );

        return;

    }



    propertyMap =
    new google.maps.Map(

        mapElement,

        {

            center:{

                lat:Number(
                    property.coordinates.lat
                ),

                lng:Number(
                    property.coordinates.lng
                )

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


    pill.innerText =
        value || "Price";


    return pill;


}



// ======================================
// MAIN PROPERTY MARKER
// ======================================

function addMainProperty(){


    const property =
        window.currentProperty;


    const lat =
        Number(
            property.coordinates.lat
        );


    const lng =
        Number(
            property.coordinates.lng
        );



    if(
        Number.isNaN(lat) ||
        Number.isNaN(lng)
    ){

        console.error(
            "Invalid main property coordinates"
        );

        return;

    }



    const pin =
        document.createElement("div");


    pin.className =
        "price-marker";


    pin.innerText =
        property.price ||
        "Price";



    new AdvancedMarkerElement({

        map:propertyMap,


        position:{
            lat,
            lng
        },


        content:pin,


        title:
            property.title

    });



    console.log(
        "MAIN PROPERTY MARKER:",
        property.title
    );


}



// ======================================
// NEARBY PROPERTIES
// ======================================

function addNearbyProperties(){


    const nearby =
        window.currentProperty?.nearby || [];



    console.log(
        "MAP NEARBY:",
        nearby
    );



    nearby.forEach(place=>{


        const lat =
            Number(
                place.lat ??
                place.coordinates?.lat
            );


        const lng =
            Number(
                place.lng ??
                place.coordinates?.lng
            );



        if(
            Number.isNaN(lat) ||
            Number.isNaN(lng)
        ){

            console.warn(
                "Skipping nearby place. Missing coordinates:",
                place
            );

            return;

        }



        const marker =
        new AdvancedMarkerElement({


            map:propertyMap,


            position:{
                lat,
                lng
            },


            title:
                place.title ||
                place.name ||
                "Nearby",


            content:
                createPricePill(
                    place.price ||
                    place.name ||
                    ""
                )


        });



        if(place.title){


            const info =
            new google.maps.InfoWindow({


                content:`

                <div>

                <h4>
                ${place.title}
                </h4>


                <p>
                ${place.status || ""}
                </p>


                <strong>
                ${place.price || ""}
                </strong>


                </div>

                `


            });



            marker.addListener(
                "gmp-click",
                ()=>{


                    info.open({

                        map:propertyMap,

                        anchor:marker

                    });


                }
            );


        }



    });


}



// ======================================
// OPTIONAL FUTURE MARKERS
// ======================================

function addSoldProperties(){

    console.log(
        "Sold properties disabled"
    );

}



function addPointsOfInterest(){

    console.log(
        "POI disabled"
    );

}



// ======================================
// GOOGLE CALLBACK
// ======================================

window.initPropertyMap =
    initPropertyMap;
