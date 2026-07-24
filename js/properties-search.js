function filterProperties(){


const search =
document.getElementById("property-search").value.toLowerCase();


const location =
document.getElementById("location-filter").value;



const filtered =
window.residences.filter(property=>{


const matchesSearch =

property.title.toLowerCase().includes(search)

||

property.location.toLowerCase().includes(search);



const matchesLocation =

!location

||

property.location.includes(location);



return matchesSearch && matchesLocation;


});



renderProperties(filtered);


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
