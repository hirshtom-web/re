// ======================================
// PROPERTY MAP CONTROLLER
// ======================================

let map;

let markers = {};

let AdvancedMarkerElement;



// ======================================
// INIT MAP
// ======================================

async function initMap(){


    const { AdvancedMarkerElement: MarkerClass } =
    await google.maps.importLibrary("marker");


    AdvancedMarkerElement = MarkerClass;



    const mapElement = 
    window.innerWidth <= 900
    ? document.getElementById("mobile-map")
    : document.getElementById("desktop-map");



    if(!mapElement){

        console.error("Map container not found");

        return;

    }




    map = new google.maps.Map(

        mapElement,

        {

            center:{

                lat:25.7617,

                lng:-80.1918

            },


            zoom:12,


            mapId:"d44ebce34f2241f5985860cf",


            mapTypeControl:false,

            streetViewControl:false,

            fullscreenControl:false,

            rotateControl:false,

            scaleControl:false,

            clickableIcons:false,

            zoomControl:false,


            gestureHandling:"greedy",



            styles:[


                {

                    featureType:"all",

                    elementType:"labels.text.fill",

                    stylers:[

                        {

                            color:"#555555"

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

                },


                {

                    featureType:"transit",

                    stylers:[

                        {

                            visibility:"off"

                        }

                    ]

                },


                {

                    featureType:"road",

                    elementType:"geometry",

                    stylers:[

                        {

                            color:"#eeeeee"

                        }

                    ]

                },


                {

                    featureType:"water",

                    elementType:"geometry",

                    stylers:[

                        {

                            color:"#dbe9f2"

                        }

                    ]

                },


                {

                    featureType:"landscape",

                    elementType:"geometry",

                    stylers:[

                        {

                            color:"#f7f6f2"

                        }

                    ]

                }


            ]


        }


    );



    google.maps.event.addListenerOnce(

        map,

        "idle",

        ()=>{

            loadPropertiesMap();

        }

    );


}




// ======================================
// FINISH MOBILE PROPERTY PREVIEW
// ======================================

// Don't let favorite button open property

const favorite =
    card.querySelector(
        ".property-favorite"
    );


if (favorite) {

    favorite.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

        }
    );

}


} // END showMobilePropertyPreview





// ======================================
// HIDE MOBILE PROPERTY PREVIEW
// ======================================

function hideMobilePropertyPreview() {


    const preview =
        document.getElementById(
            "mobile-property-preview"
        );


    if (!preview) {

        return;

    }


    preview.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            if (
                !preview.classList.contains("show")
            ) {

                preview.innerHTML = "";

            }

        },
        300
    );


}


        // ===============================
// MARKER INTERACTIONS
// ===============================

price.addEventListener(
    "mouseenter",
    ()=>{


        price.classList.add("active");


        const card =
        document.querySelector(
            `[data-property-id="${property.id}"]`
        );


        if(card){

            card.classList.add(
                "active-property"
            );

        }


    }
);



price.addEventListener(
    "mouseleave",
    ()=>{


        price.classList.remove(
            "active"
        );


        const card =
        document.querySelector(
            `[data-property-id="${property.id}"]`
        );


        if(card){

            card.classList.remove(
                "active-property"
            );

        }


    }
);





price.addEventListener(
    "click",
    () => {

        if (window.innerWidth <= 900) {

            showMobilePropertyPreview(
                property
            );

            return;

        }


        const card =
            document.querySelector(
                `[data-property-id="${property.id}"]`
            );


        if (card) {

            card.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


            card.classList.add(
                "active-property"
            );


            setTimeout(() => {

                card.classList.remove(
                    "active-property"
                );

            }, 2000);

        }

    }
);


               bounds.extend(position);


        // ======================================
        // MARKER CLICK
        // ======================================

        marker.addListener(
            "gmp-click",
            () => {

                // Mobile behavior
                if (window.innerWidth <= 900) {


                    if (
                        typeof collapsePropertySheet === "function"
                    ) {

                        collapsePropertySheet();

                    }


                    showMobilePropertyPreview(
                        property
                    );


                    return;

                }



                // Desktop behavior

                const card =
                    document.querySelector(
                        `[data-property-id="${property.id}"]`
                    );


                if (card) {


                    card.scrollIntoView({

                        behavior: "smooth",

                        block: "center"

                    });


                    card.classList.add(
                        "active-property"
                    );


                    setTimeout(
                        () => {

                            card.classList.remove(
                                "active-property"
                            );

                        },
                        2000
                    );


                }


            }
        );



    }); // closes window.properties.forEach()



    // ======================================
    // FIT MAP TO MARKERS
    // ======================================

    if (!bounds.isEmpty()) {


        map.fitBounds(bounds);


        google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            () => {


                if (map.getZoom() > 14) {

                    map.setZoom(14);

                }


            }
        );


    }



    connectCardsToMap();


} // closes loadPropertiesMap()




// ======================================
// CARD -> MAP
// ======================================

function connectCardsToMap(){


    const cards =
    document.querySelectorAll(
        ".property-card"
    );



    cards.forEach(card=>{


        const id =
        card.dataset.propertyId;



        const marker =
        markers[id];



        if(!marker){

            return;

        }



        // ===============================
        // CARD CLICK
        // ===============================

        card.addEventListener(
            "click",
            (e)=>{


                e.stopPropagation();



                // Move map

                map.panTo(
                    marker.position
                );


                map.setZoom(15);



                // Desktop modal

                if(window.innerWidth > 900){


                    openModal(
                        "residence.html",
                        id
                    );


                }



                // Mobile sheet

                else{


                    if(typeof openPropertySheet === "function"){

                        openPropertySheet(id);

                    }


                }



            }

        );





        // ===============================
        // CARD HOVER -> BIGGER PILL
        // ===============================

        card.addEventListener(
            "mouseenter",
            ()=>{


                map.panTo(
                    marker.position
                );



                if(marker.content){

                    marker.content.classList.add(
                        "active"
                    );

                }



                card.classList.add(
                    "active-property"
                );


            }

        );





        card.addEventListener(
            "mouseleave",
            ()=>{


                if(marker.content){

                    marker.content.classList.remove(
                        "active"
                    );

                }



                card.classList.remove(
                    "active-property"
                );


            }

        );


    });


}
