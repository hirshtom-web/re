function loadResidencePage(){


const params =
new URLSearchParams(window.location.search);


const id =
params.get("id");



const property =
window.properties.find(
p=>p.id===id
);



if(!property){

console.error("Property not found");
return;

}



// HERO IMAGE

document.getElementById("residence-main-image")
.src =
property.images?.[0] || property.thumbnail;



document.getElementById("residence-title")
.innerHTML =
property.title;



document.getElementById("residence-location")
.innerHTML =
property.location;



document.getElementById("residence-price")
.innerHTML =
property.price || "Request Pricing";



}



loadResidencePage();
