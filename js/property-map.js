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


    if(!window.currentProperty.coordinates){

        console.error(
            "Property coordinates missing"
        );

        return;

    }


    const mapContainer =
    document.getElementById("property-map");


    if(!mapContainer){

        console.error(
            "Map container missing"
        );

        return;

    }



    propertyMap =
    new google.maps.Map(

        mapContainer,

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
            rotateControl:false

        }

    );


    addMainProperty();

    addSoldProperties();

    addNearbyProperties();

    addPointsOfInterest();


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

    const pin =
    document.createElement("div");


    pin.style.background = "black";
    pin.style.color = "white";
    pin.style.padding = "10px 15px";
    pin.style.borderRadius = "30px";
    pin.style.fontSize = "14px";


    pin.innerText =
    window.currentProperty.price || "$5M+";



    const marker =
    new AdvancedMarkerElement({

        map:propertyMap,

        position:{
    lat:Number(
        window.currentProperty.coordinates?.lat || 25.7617
    ),

    lng:Number(
        window.currentProperty.coordinates?.lng || -80.1918
    )
},

        content:pin

    });


    console.log(
        "MAIN PROPERTY MARKER CREATED",
        marker
    );

}




// ======================================
// SOLD
// ======================================

function addSoldProperties(){


    const soldProperties =
    window.currentProperty.soldProperties;



    if(!soldProperties){

        console.warn(
            "No sold properties found"
        );

        return;

    }



    soldProperties.forEach(property=>{


        new AdvancedMarkerElement({

            map:propertyMap,

            position:{
                lat:Number(property.lat),
                lng:Number(property.lng)
            },

            title:property.title,

            content:createPricePill(
                property.price
            )

        });


    });


}





// ======================================
// DEVELOPMENTS / NEARBY
// ======================================

function addNearbyProperties(){

    const nearby =
    window.currentProperty?.nearby;


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

            content:createPricePill(property.price)

        });


        const info =
        new google.maps.InfoWindow({

            content:`

            <div>
                <h4>${property.title}</h4>
                <p>${property.status || ""}</p>
                <strong>${property.price || ""}</strong>
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


        const marker =
        new AdvancedMarkerElement({

            map:propertyMap,

            position:{
                lat:Number(property.lat),
                lng:Number(property.lng)
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

                <h4>
                    ${property.title || ""}
                </h4>

                <p>
                    ${property.status || ""}
                </p>

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





// ======================================
// POINTS OF INTEREST
// ======================================

function addPointsOfInterest(){


    const pointsOfInterest =
    window.currentProperty.pointsOfInterest;



    if(!pointsOfInterest){

        console.warn(
            "No points of interest found"
        );

        return;

    }



    pointsOfInterest.forEach(place=>{


        new AdvancedMarkerElement({

            map:propertyMap,

            position:{
                lat:Number(place.lat),
                lng:Number(place.lng)
            },

            title:place.name,

            content:createPricePill(
                place.name
            )

        });


    });


}
