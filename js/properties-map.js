let map;

let markers = {};


function initMap(){


    map = new google.maps.Map(
        document.getElementById("map"),
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


    loadPropertiesMap();

}



function loadPropertiesMap(){


    if(!window.properties){

        console.warn("No properties found");

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

            lat:property.coordinates.lat,

            lng:property.coordinates.lng

        };



        const marker = new google.maps.Marker({

            position:position,

            map:map,

            title:property.title

        });



        markers[property.id] = marker;



        bounds.extend(position);



        /*
        MARKER CLICK
        */

        marker.addListener(
            "click",
            ()=>{


                const card =
                document.querySelector(
                    `[data-id="${property.id}"]`
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

    }



    connectCardsToMap();



}




function connectCardsToMap(){


    const cards =
    document.querySelectorAll(
        ".property-card"
    );



    cards.forEach(card=>{


        const id =
        card.dataset.id;



        const marker =
        markers[id];



        if(!marker){

            return;

        }



        /*
        CARD CLICK
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
        CARD HOVER
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
