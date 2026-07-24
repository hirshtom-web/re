window.residences.forEach(property=>{


new google.maps.Marker({

position:{
lat:property.coordinates.lat,
lng:property.coordinates.lng
},

map:map,

title:property.title

});


});
