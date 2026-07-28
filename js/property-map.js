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

    const pin = document.createElement("div");

    pin.style.background = "black";
    pin.style.color = "white";
    pin.style.padding = "10px 15px";
    pin.style.borderRadius = "30px";
    pin.style.fontSize = "14px";
    pin.innerText = "$5M+";


    const marker =
    new AdvancedMarkerElement({

        map: propertyMap,

        position: {
            lat:25.7617,
            lng:-80.1918
        },

        content:pin

    });


    console.log("MARKER CREATED", marker);

}



// ======================================
// SOLD
// ======================================

function addSoldProperties(){

    if(!window.soldProperties){

        console.warn(
            "No sold properties found"
        );

        return;

    }


    window.soldProperties.forEach(property=>{


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

    if(!window.nearbyProperties){

        console.warn(
            "No nearby properties found"
        );

        return;

    }


    window.nearbyProperties.forEach(property=>{


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

    if(!window.pointsOfInterest){

        console.warn(
            "No points of interest found"
        );

        return;

    }


    window.pointsOfInterest.forEach(place=>{


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
