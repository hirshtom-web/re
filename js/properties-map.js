if(typeof google === "undefined"){
    console.warn("Google Maps not loaded");
    return;
}


const mapElement = document.getElementById("properties-map");

if(!mapElement){
    console.warn("Map container missing");
    return;
}


const map = new google.maps.Map(mapElement,{
    zoom:12,
    center:{
        lat:25.7907,
        lng:-80.1300
    }
});


window.properties.forEach(property=>{


    if(!property.coordinates){
        console.warn("Missing coordinates:", property.id);
        return;
    }


    new google.maps.Marker({

        position:{
            lat:property.coordinates.lat,
            lng:property.coordinates.lng
        },

        map:map,

        title:property.title

    });


});
