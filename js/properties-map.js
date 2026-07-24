if(typeof google === "undefined"){
    console.warn("Google Maps not loaded");
    return;
}


window.properties.forEach(property=>{


    if(!property.coordinates){
        console.warn("Missing coordinates:", property.id);
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
