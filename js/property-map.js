// ======================================
// PROPERTY MAP CONTROLLER
// ======================================

let propertyMap;


// ======================================
// CURRENT PROPERTY DATA
// ======================================

const propertyData = {

    title: "St. Regis Residences Miami",

    coordinates:{
        lat:25.7617,
        lng:-80.1918
    },

    price:"From $5M"

};


// ======================================
// SOLD PROPERTIES
// ======================================

const soldProperties = [

    {
        title:"Sold Residence",
        price:"$3.8M",
        lat:25.7609,
        lng:-80.1902
    },

    {
        title:"Sold Residence",
        price:"$5.2M",
        lat:25.7624,
        lng:-80.1921
    }

];


// ======================================
// POINTS OF INTEREST
// ======================================

const pointsOfInterest = [

    {
        name:"Brickell City Centre",
        category:"shopping",
        lat:25.7670,
        lng:-80.1930
    },

    {
        name:"Mandarin Oriental Miami",
        category:"hotel",
        lat:25.7610,
        lng:-80.1870
    },

    {
        name:"Bayside Marketplace",
        category:"shopping",
        lat:25.7780,
        lng:-80.1860
    }

];


// ======================================
// NEARBY DEVELOPMENTS
// ======================================

const nearbyProperties = [

    {
        title:"888 Brickell",
        status:"Pre-Construction",
        price:"$1.5M+",
        lat:25.7650,
        lng:-80.1900
    },

    {
        title:"Baccarat Residences Miami",
        status:"Pre-Construction",
        price:"$1.5M+",
        lat:25.7660,
        lng:-80.1885
    }

];



// ======================================
// INITIALIZE MAP
// ======================================

function initMap(){


    propertyMap = new google.maps.Map(

        document.getElementById("property-map"),

        {

            center:propertyData.coordinates,

            zoom:17,

            mapId:"d44ebce34f2241f5985860cf",

            styles:[

                {
                    elementType:"geometry",
                    stylers:[
                        {
                            color:"#1c1c1c"
                        }
                    ]
                },

                {
                    elementType:"labels.text.fill",
                    stylers:[
                        {
                            color:"#d8d8d8"
                        }
                    ]
                },

                {
                    featureType:"poi",
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
// PRICE PILL CREATOR
// ======================================

function createPricePill(price){


    const pill =
    document.createElement("div");


    pill.className =
    "price-marker";


    let text = price || "Price";


    const isFrom =
    /^from\s+/i.test(text);


    text =
    text.replace(/^from\s+/i,"");


    if(isFrom){

        text += "+";

    }


    pill.textContent = text;


    return pill;


}



// ======================================
// MAIN PROPERTY MARKER
// ======================================

function addMainProperty(){


    const marker =
    new google.maps.marker.AdvancedMarkerElement({

        map:propertyMap,

        position:propertyData.coordinates,

        title:propertyData.title,

        content:
        createPricePill(propertyData.price)

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



    marker.addListener(

        "click",

        ()=>{

            info.open({

                map:propertyMap,

                anchor:marker

            });

        }

    );


}




// ======================================
// SOLD PROPERTY MARKERS
// ======================================

function addSoldProperties(){


    soldProperties.forEach(property=>{


        new google.maps.marker.AdvancedMarkerElement({

            map:propertyMap,

            position:{
                lat:property.lat,
                lng:property.lng
            },

            title:property.title,

            content:
            createPricePill(property.price)

        });


    });


}




// ======================================
// NEARBY DEVELOPMENTS
// ======================================

function addNearbyProperties(){


    nearbyProperties.forEach(property=>{


        const marker =
        new google.maps.marker.AdvancedMarkerElement({


            map:propertyMap,


            position:{
                lat:property.lat,
                lng:property.lng
            },


            title:property.title,


            content:
            createPricePill(property.price)


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



        marker.addListener(

            "click",

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


    pointsOfInterest.forEach(place=>{


        new google.maps.marker.AdvancedMarkerElement({

            map:propertyMap,


            position:{
                lat:place.lat,
                lng:place.lng
            },


            title:place.name,


            content:
            createPricePill(place.name)


        });


    });


}
