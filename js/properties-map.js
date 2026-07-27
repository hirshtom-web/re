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
// MOBILE PROPERTY PREVIEW
// ======================================

function showMobilePropertyPreview(property) {

    if (window.innerWidth > 900) {
        return;
    }


    const preview =
        document.getElementById(
            "mobile-property-preview"
        );


    if (!preview) {
        console.warn(
            "Mobile property preview missing"
        );

        return;
    }


    preview.innerHTML = `

        <article
            class="property-card"
            data-property-id="${property.id}">


            <div class="property-card-image">

                <img
                    src="${
                        property.images?.[0]
                        ||
                        property.thumbnail
                        ||
                        "images/placeholder.jpg"
                    }"
                    alt="${property.title}">


                <span class="property-badge">

                    ${property.status || "Available"}

                </span>


                <button
                    class="property-favorite"
                    type="button">

                    ♡

                </button>

            </div>


            <div class="property-card-info">


                <div class="property-card-header">

                    <h3>
                        ${property.title}
                    </h3>


                    <strong>
                        ${property.price || "Request Pricing"}
                    </strong>

                </div>


                <p>

                    ${property.location || ""}

                    ${
                        property.neighborhood
                        ? " · " + property.neighborhood
                        : ""
                    }

                </p>


            </div>

        </article>

    `;


    preview.classList.add("show");


    const card =
        preview.querySelector(
            ".property-card"
        );


    if (!card) {
        return;
    }


    // ======================================
    // CLICK PREVIEW → SINGLE PROPERTY PAGE
    // ======================================

    card.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            openModal(
                "residence.html",
                property.id
            );

        }
    );


    // Don't let favorite button
    // open the property

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

}



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


    preview.classList.remove("show");

    preview.innerHTML = "";

}




// ======================================
// LOAD PROPERTY MARKERS
// ======================================

function loadPropertiesMap(){


    if(!window.properties){

        console.warn(
            "No properties found"
        );

        return;

    }



    const bounds =
    new google.maps.LatLngBounds();



    window.properties.forEach(property=>{


        if(!property.coordinates){

            console.warn(
                "Missing coordinates:",
                property.title
            );

            return;

        }



        const position = {


            lat:Number(property.coordinates.lat),


            lng:Number(property.coordinates.lng)


        };



        // PRICE PILL

        const price =
        document.createElement("div");


        price.className =
        "price-marker";



        let priceText =
        property.price || "Price";



        const isFrom =
        /^from\s+/i.test(priceText);



        priceText =
        priceText.replace(
            /^from\s+/i,
            ""
        );



        if(isFrom){

            priceText += "+";

        }



        price.textContent =
        priceText;



        // ADVANCED MARKER

        const marker =
        new AdvancedMarkerElement({

            map:map,

            position:position,

            content:price,

            title:property.title

        });



        markers[property.id] =
        marker;

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




        marker.addEventListener(
    "gmp-click",
    () => {

        // Mobile marker behavior
        if (window.innerWidth <= 900) {

            // Make sure the large property sheet
            // stays collapsed.
            if (
                typeof collapsePropertySheet ===
                "function"
            ) {

                collapsePropertySheet();

            }


            // Show only the selected property
            showMobilePropertyPreview(
                property
            );


            return;

        }


        // Desktop marker behavior
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



  if(!bounds.isEmpty()) {

    google.maps.event.addListenerOnce(
        map,
        "bounds_changed",
        () => {

            if (map.getZoom() > 14) {
                map.setZoom(14);
            }

        }
    );

    map.fitBounds(bounds);

}



    connectCardsToMap();


}







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
