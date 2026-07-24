function renderProperties(properties = window.residences){


const propertiesGrid =
document.getElementById("properties-grid");


if(!propertiesGrid){
console.error("Grid missing");
return;
}


propertiesGrid.innerHTML="";


properties.forEach(property=>{


propertiesGrid.innerHTML += `


<article
class="property-card"
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
