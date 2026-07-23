const grid =
document.getElementById("properties-grid");


residences.forEach(property => {


grid.innerHTML += `

<article 
class="property-card"
data-property-id="${property.id}"
onclick="openModal('residence.html','${property.id}')">


<div class="property-card-image">

<img 
src="${property.image}"
alt="${property.title}">


<span class="property-badge">
Exclusive
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
${property.price}
</strong>


</div>


</article>

`;

});
