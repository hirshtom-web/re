function renderResidencePage(){


const container =
document.getElementById("residence-container");


const id =
new URLSearchParams(window.location.search).get("id");



const property =
window.residences.find(
item => item.id === id
);



if(!property){

container.innerHTML =
"Property not found";

return;

}



container.innerHTML = `


<section class="hero">

<img src="${property.thumbnail}">

<h1>
${property.title}
</h1>

<p>
${property.location}
</p>

<strong>
${property.price}
</strong>

</section>


<section>

<h2>
About
</h2>

<p>
${property.description}
</p>

</section>


`;

}


renderResidencePage();
