function renderPropertiesGrid(propertiesList = window.properties){


const propertiesGrid =
document.getElementById("properties-grid");


if(!propertiesGrid || !propertiesList){

console.error("Grid missing or properties data missing");
return;

}


propertiesGrid.innerHTML = "";


propertiesList.forEach(property=>{


propertiesGrid.innerHTML += `


<article
class="property-card"
data-property-id="${property.id}"
onclick="openModal('residence.html','${property.id}')">


<div class="property-card-image">


<img

src="${property.images?.[0] || property.thumbnail}"

alt="${property.title}">


<span class="property-badge">

${property.status || "Available"}

</span>


</div>



<div class="property-card-info">


<h3>
${property.title}
</h3>


<p>
${property.location}
</p>


<strong>
${property.price || "Request Pricing"}
</strong>


</div>


</article>


`;

});


}


// initial load

renderPropertiesGrid();
