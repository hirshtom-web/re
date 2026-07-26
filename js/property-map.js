// ======================================
// PROPERTY MAP CONTROLLER
// ======================================

let propertyMap;

let AdvancedMarkerElement;



// ======================================
// INIT MAP
// ======================================

async function initMap(){


    // Load marker library first

    const { AdvancedMarkerElement: MarkerClass } =
    await google.maps.importLibrary("marker");


    AdvancedMarkerElement = MarkerClass;



    propertyMap =
    new google.maps.Map(

        document.getElementById("property-map"),

        {

            center:propertyData.coordinates,

            zoom:17,

            mapId:"d44ebce34f2241f5985860cf",


            mapTypeControl:false,

            streetViewControl:false,

            fullscreenControl:false,

            rotateControl:false,

            fullscreenControl:false,


            styles:[

                {
                    featureType:"poi",

                    stylers:[
                        {
                            visibility:"off"
                        }
                    ]
                },

                {
                    featureType:"transit",

                    stylers:[
                        {
                            visibility:"off"
                        }
                    ]
                }

            ]

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


    const marker =
    new AdvancedMarkerElement({

        map:propertyMap,

        position:propertyData.coordinates,

        title:propertyData.title,

        content:createPricePill(propertyData.price)

    });



    const info =
    new google.maps.InfoWindow({

        content:`

        <div class="map-card">

            <h3>${propertyData.title}</h3>

            <p>${propertyData.price}</p>

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
