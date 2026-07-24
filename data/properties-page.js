function filterProperties(){


const search =
document
.getElementById("property-search")
.value
.toLowerCase();



const location =
document
.getElementById("location-filter")
.value;



let filtered =

window.properties.filter(property=>{


const searchMatch =

property.title.toLowerCase().includes(search)

||

property.location.toLowerCase().includes(search);



const locationMatch =

!location

||

property.location.includes(location);



return searchMatch && locationMatch;


});



renderPropertiesGrid(filtered);


}



document
.getElementById("property-search")
.addEventListener(
"input",
filterProperties
);



document
.getElementById("location-filter")
.addEventListener(
"change",
filterProperties
);
