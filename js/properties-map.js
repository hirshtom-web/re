let map;


function initMap(){

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center:{
                lat:31.7683,
                lng:35.2137
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
        console.warn("Missing coordinates:", property);
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
