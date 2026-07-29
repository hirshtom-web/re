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



    // CLOSE MINI CARD WHEN USER MOVES MAP

    map.addListener(
        "dragstart",
        ()=>{

            hideMobilePropertyPreview();

        }
    );



    map.addListener(
        "zoom_changed",
        ()=>{

            hideMobilePropertyPreview();

        }
    );



    google.maps.event.addListenerOnce(

    map,

    "idle",

    ()=>{

        loadPropertiesMap();

        enablePreviewDrag();

    }

);






// ======================================
// MOBILE PROPERTY PREVIEW
// ======================================

function showMobilePropertyPreview(property){


    if(window.innerWidth > 900){

        return;

    }



    const preview =
    document.getElementById(
        "map-property-preview"
    );



    if(!preview){

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
                        ?
                        " · " + property.neighborhood
                        :
                        ""
                    }
                </p>


            </div>


        </article>

    `;



    preview.classList.add(
        "show"
    );



    const card =
    preview.querySelector(
        ".property-card"
    );



    if(!card){

        return;

    }



    card.addEventListener(
        "click",
        (event)=>{


            event.stopPropagation();


            openModal(
                "residence.html",
                property.id
            );


        }
    );



    const favorite =
    card.querySelector(
        ".property-favorite"
    );



    if(favorite){

        favorite.addEventListener(
            "click",
            (event)=>{

                event.preventDefault();

                event.stopPropagation();

            }
        );

    }


}




// ======================================
// HIDE MOBILE PROPERTY PREVIEW
// ======================================

    function hideMobilePropertyPreview(){

    const preview =
    document.getElementById(
        "map-property-preview"
    );

    if(!preview){
        return;
    }

    preview.classList.remove("show");

    preview.style.transform = "";

    preview.innerHTML = "";

}


// ======================================
// PREVIEW DRAG DOWN TO CLOSE
// ======================================

function enablePreviewDrag(){

    const preview =
    document.getElementById(
        "map-property-preview"
    );


    if(!preview) return;


    let startY = 0;
    let currentY = 0;
    let dragging = false;



    preview.addEventListener(
        "touchstart",
        e=>{

            startY =
e.touches[0].clientY;

currentY = startY;

dragging = true;

            preview.classList.add(
                "dragging"
            );

        },
        {passive:true}
    );



    preview.addEventListener(
        "touchmove",
        e=>{

            if(!dragging) return;


            currentY =
            e.touches[0].clientY;


            let distance =
            currentY-startY;


            if(distance > 0){

                preview.style.transform =
                `translateY(${distance}px)`;

            }

        },
        {passive:true}
    );



    preview.addEventListener(
        "touchend",
        ()=>{


            dragging=false;


            preview.classList.remove(
                "dragging"
            );


            let moved =
            currentY-startY;



            if(moved > 100){

                hideMobilePropertyPreview();

            }
            else{

                preview.style.transform="";

            }


        }
    );

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



        const price =
        document.createElement("div");



        price.className =
        "price-marker";



        price.textContent =
        property.price || "Price";



        const marker =
        new AdvancedMarkerElement({

            map:map,

            position:position,

            content:price,

            title:property.title

        });



        markers[property.id] =
        marker;



        bounds.extend(position);


                                      // ======================================
        // PRICE HOVER
        // ======================================

        price.addEventListener(
            "mouseenter",
            ()=>{


                price.classList.add(
                    "active"
                );


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





        // ======================================
        // PRICE CLICK
        // ======================================

        price.addEventListener(
            "click",
            ()=>{


                if(window.innerWidth <= 900){

                    showMobilePropertyPreview(
                        property
                    );

                    return;

                }



                const card =
                document.querySelector(
                    `[data-property-id="${property.id}"]`
                );



                if(card){

                    card.scrollIntoView({

                        behavior:"smooth",

                        block:"center"

                    });


                    card.classList.add(
                        "active-property"
                    );


                    setTimeout(
                        ()=>{

                            card.classList.remove(
                                "active-property"
                            );

                        },
                        2000
                    );

                }


            }
        );





        // ======================================
        // MARKER CLICK
        // ======================================

        marker.addListener(
            "gmp-click",
            ()=>{


                if(window.innerWidth <= 900){


                    if(
                        typeof collapsePropertySheet === "function"
                    ){

                        collapsePropertySheet();

                    }



                    showMobilePropertyPreview(
                        property
                    );


                    return;

                }





                const card =
                document.querySelector(
                    `[data-property-id="${property.id}"]`
                );



                if(card){


                    card.scrollIntoView({

                        behavior:"smooth",

                        block:"center"

                    });



                    card.classList.add(
                        "active-property"
                    );



                    setTimeout(
                        ()=>{

                            card.classList.remove(
                                "active-property"
                            );

                        },
                        2000
                    );


                }


            }
        );



    }); // END properties.forEach





    // ======================================
    // FIT MAP TO MARKERS
    // ======================================

    if(!bounds.isEmpty()){


        map.fitBounds(
            bounds
        );



        google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            ()=>{


                if(map.getZoom() > 14){

                    map.setZoom(14);

                }


            }
        );


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



        const marker = markers[id];


// still allow card clicks even without a map marker
if(!marker){

    card.addEventListener(
        "click",
        (event)=>{

            event.stopPropagation();

            if(window.innerWidth > 900){

                openModal(
                    "residence.html",
                    id
                );

            }

        }
    );

    return;

}





        // ======================================
        // CARD CLICK
        // ======================================

        card.addEventListener(
            "click",
            (event)=>{


                event.stopPropagation();



                map.panTo(
                    marker.position
                );



                map.setZoom(
                    15
                );



                if(window.innerWidth > 900){


                    openModal(
                        "residence.html",
                        id
                    );


                }

                else{


                    if(
                        typeof openPropertySheet === "function"
                    ){

                        openPropertySheet(id);

                    }


                }


            }
        );






        // ======================================
        // CARD HOVER
        // ======================================

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
