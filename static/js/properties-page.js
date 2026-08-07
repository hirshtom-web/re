function filterProperties(){


const searchInput =
document.getElementById("property-search");


const locationFilter =
document.getElementById("location-filter");


const sortFilter =
document.getElementById("property-sort");



let search =
searchInput.value.toLowerCase();



let location =
locationFilter.value;



let filtered = window.properties.filter(property=>{


let textMatch =

property.title.toLowerCase().includes(search)

||

property.location.toLowerCase().includes(search)

||

(property.neighborhood || "")
.toLowerCase()
.includes(search);



let locationMatch =

!location ||

property.location.includes(location);



return textMatch && locationMatch;


});




// SORTING

if(sortFilter){


switch(sortFilter.value){


case "price-low":

filtered.sort((a,b)=>{

return (a.priceValue || 0) -
(b.priceValue || 0);

});

break;



case "price-high":

filtered.sort((a,b)=>{

return (b.priceValue || 0) -
(a.priceValue || 0);

});

break;



case "name":

filtered.sort((a,b)=>{

return a.title.localeCompare(b.title);

});

break;


}


}



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



const sort =
document.getElementById("property-sort");


if(sort){

sort.addEventListener(
"change",
filterProperties
);

}
