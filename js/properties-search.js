function filterProperties(){


const searchInput =
document.getElementById("property-search");


const locationFilter =
document.getElementById("location-filter");


const priceFilter =
document.getElementById("price-filter");


const sortFilter =
document.getElementById("sort-filter");



let search =
searchInput.value.toLowerCase();



let location =
locationFilter.value;



let price =
priceFilter.value;



let filtered =
window.properties.filter(property=>{


const title =
(property.title || "")
.toLowerCase();



const loc =
(property.location || "")
.toLowerCase();



const neighborhood =
(property.neighborhood || "")
.toLowerCase();



const textMatch =

title.includes(search)

||

loc.includes(search)

||

neighborhood.includes(search);



const locationMatch =

!location

||

property.location.includes(location);



let priceMatch=true;



if(price){


const value =
property.priceValue || 0;



if(price==="1"){

priceMatch=value < 2000000;

}



if(price==="2"){

priceMatch=
value >=2000000 &&
value <=5000000;

}



if(price==="3"){

priceMatch=value >5000000;

}


}




return (

textMatch

&&

locationMatch

&&

priceMatch

);


});





// SORT


if(sortFilter.value){


switch(sortFilter.value){


case "price-low":

filtered.sort((a,b)=>
(a.priceValue||0)
-
(b.priceValue||0)
);

break;



case "price-high":

filtered.sort((a,b)=>
(b.priceValue||0)
-
(a.priceValue||0)
);

break;



case "name":

filtered.sort((a,b)=>
a.title.localeCompare(b.title)
);

break;



case "location":

filtered.sort((a,b)=>
a.location.localeCompare(b.location)
);

break;


}



}



renderPropertiesGrid(filtered);



if(window.updateMapMarkers){

updateMapMarkers(filtered);

}


}




document
.getElementById("property-search")
?.addEventListener(
"input",
filterProperties
);



document
.getElementById("location-filter")
?.addEventListener(
"change",
filterProperties
);



document
.getElementById("price-filter")
?.addEventListener(
"change",
filterProperties
);



document
.getElementById("sort-filter")
?.addEventListener(
"change",
filterProperties
);
