let map;


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

    loadPropertiesMap();

}



function loadPropertiesMap(){

    if(!window.properties){
        console.warn("No properties found");
        return;
    }


    window.properties.forEach(property => {


        if(!property.coordinates){
            console.warn("Missing coordinates:", property.title);
            return;
        }


        new google.maps.Marker({

            position:{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng
            },

            map: map,

            title: property.title

        });


    });

}
