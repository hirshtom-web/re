let map;
let geocoder;


function initMap(){

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center:{
                lat:25.7617,
                lng:-80.1918
            },
            zoom:12
        }
    );


    geocoder = new google.maps.Geocoder();

    loadPropertiesMap();

}



function loadPropertiesMap(){

    if(!window.properties){
        console.warn("No properties found");
        return;
    }


    window.properties.forEach(property => {


        if(!property.address){
            console.warn("No address:", property.title);
            return;
        }


        geocoder.geocode(
            {
                address: property.address
            },

            (results, status) => {


                if(status === "OK"){


                    new google.maps.Marker({

                        map: map,

                        position: results[0].geometry.location,

                        title: property.title

                    });


                } else {

                    console.warn(
                        "Geocode failed:",
                        property.title,
                        status
                    );

                }

            }
        );


    });

}
