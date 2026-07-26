let map;

let markers = {};



function initMap(){


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


            zoom:11,


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



    /*
    Wait until Google finishes rendering
    */

    google.maps.event.addListenerOnce(

        map,

        "idle",

        ()=>{

            loadPropertiesMap();

        }

    );


}





function loadPropertiesMap(){


    if(!window.properties){

        console.warn(
            "No properties found"
        );

        return;

    }



    const bounds = new google.maps.LatLngBounds();



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



        const marker = new google.maps.Marker({


            position:position,


            map:map,


            title:property.title


        });



        markers[property.id] = marker;



        bounds.extend(position);




        marker.addListener(

            "click",

            ()=>{


                const card = document.querySelector(
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



                    setTimeout(()=>{


                        card.classList.remove(

                            "active-property"

                        );


                    },2000);


                }


            }

        );



    });




    if(!bounds.isEmpty()){


        map.fitBounds(bounds);



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







function connectCardsToMap(){



    const cards = document.querySelectorAll(

        ".property-card"

    );



    cards.forEach(card=>{


        const id = card.dataset.propertyId;



        const marker = markers[id];



        if(!marker){

            return;

        }





        /*
        Card click -> move map
        */


        card.addEventListener(

            "click",

            ()=>{


                map.panTo(

                    marker.getPosition()

                );


                map.setZoom(15);


            }

        );






        /*
        Card hover -> highlight marker
        */


        card.addEventListener(

            "mouseenter",

            ()=>{


                map.panTo(

                    marker.getPosition()

                );



                marker.setAnimation(

                    google.maps.Animation.BOUNCE

                );


            }

        );





        card.addEventListener(

            "mouseleave",

            ()=>{


                marker.setAnimation(null);


            }

        );



    });



}
