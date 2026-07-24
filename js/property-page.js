function loadPropertyPage(){

const params = new URLSearchParams(window.location.search);

const id = params.get("id");


if(!id){
    console.error("No property ID found");
    return;
}


const property = window.properties.find(
    p => p.id === id
);


if(!property){

    console.error("Property not found:", id);
    return;

}


console.log("LOADED PROPERTY:", property);



/* MAIN IMAGE */

const mainImage = document.getElementById("property-main-image");

if(mainImage){

    mainImage.src =
    property.images?.[0] ||
    property.thumbnail ||
    "";

}



/* TITLE */

const title =
document.getElementById("property-title");

if(title){

    title.innerHTML =
    property.title || "";

}



/* STATUS */

const status =
document.getElementById("property-status");

if(status){

    status.innerHTML =
    property.status || "";

}



/* ADDRESS */

const address =
document.getElementById("property-address");

if(address){

    address.innerHTML =
    property.location || "";

}


}



/* RUN */

document.addEventListener(
"DOMContentLoaded",
loadPropertyPage
);
