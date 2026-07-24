function renderPropertiesGrid(){
  

const propertiesGrid =
document.getElementById("properties-grid");


if(!propertiesGrid || !window.residences){
console.error("Grid missing or residences data missing");
return;
}


propertiesGrid.innerHTML="";


window.residences.forEach(property=>{


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


// START GRID
renderPropertiesGrid();
