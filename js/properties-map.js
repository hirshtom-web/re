function loadPropertiesMap(){

    if(typeof google === "undefined"){
        console.warn("Google Maps not loaded");
        return;
    }


    if(!window.properties){
        console.warn("No properties found");
        return;
    }


    window.properties.forEach(property => {

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


document.addEventListener(
"DOMContentLoaded",
loadPropertiesMap
);
