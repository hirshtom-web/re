// ======================================
// PROPERTY MAP CONTROLLER
// ======================================

let propertyMap;

let AdvancedMarkerElement;


// ======================================
// INIT MAP
// ======================================

async function initMap(){


    const { AdvancedMarkerElement: MarkerClass } =
    await google.maps.importLibrary("marker");


    AdvancedMarkerElement = MarkerClass;



    if(!window.currentProperty){

        console.error(
            "No current property loaded"
        );

        return;

    }



    const coords =
    window.currentProperty.coordinates;



    if(!coords){

        console.error(
            "Property coordinates missing"
        );

        return;

    }



    const center = {

        lat:Number(coords.lat),

        lng:Number(coords.lng)

    };



    propertyMap =
    new google.maps.Map(

        document.getElementById("property-map"),

        {

            center:center,

            zoom:14,


            mapId:"d44ebce34f2241f5985860cf",


            mapTypeControl:false,

            streetViewControl:false,

            fullscreenControl:false,

            rotateControl:false,


            gestureHandling:"greedy"

        }

    );



    addMainProperty();



    addNearbyProperties();


}




// ======================================
// EXPOSE GOOGLE CALLBACK
// ======================================

window.initMap = initMap;






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
// MAIN PROPERTY
// ======================================

function addMainProperty(){


    const coords =
    window.currentProperty.coordinates;



    const pin =
    document.createElement("div");


    pin.style.background="#111";

    pin.style.color="#fff";

    pin.style.padding="10px 16px";

    pin.style.borderRadius="30px";

    pin.style.fontSize="14px";

    pin.style.fontWeight="600";


    pin.innerText =
    window.currentProperty.price || "$";



    new AdvancedMarkerElement({

        map:propertyMap,


        position:{

            lat:Number(coords.lat),

            lng:Number(coords.lng)

        },


        content:pin


    });



    console.log(
        "MAIN PROPERTY MARKER CREATED"
    );


}







// ======================================
// NEARBY PROPERTIES
// ======================================

function addNearbyProperties(){


    const nearby =
    window.currentProperty.nearby;



    if(!nearby){

        console.warn(
            "No nearby properties found"
        );

        return;

    }



    nearby.forEach(property=>{


        if(!property.coordinates){

            console.warn(
                "Nearby property missing coordinates",
                property
            );

            return;

        }



        const marker =
        new AdvancedMarkerElement({

            map:propertyMap,


            position:{

                lat:Number(property.coordinates.lat),

                lng:Number(property.coordinates.lng)

            },


            title:property.title,


            content:createPricePill(
                property.price
            )


        });



        const info =
        new google.maps.InfoWindow({

            content:`

            <div>

                <h4>${property.title}</h4>

                <p>${property.status || ""}</p>

                <strong>
                ${property.price || ""}
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


    });


}
