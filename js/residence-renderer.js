const params = new URLSearchParams(
    window.location.search
);


const id = params.get("id");


const residence = residences[id];


if(residence){


document.querySelector("#residence-title").innerHTML =
residence.title;


document.querySelector("#residence-subtitle").innerHTML =
residence.subtitle;


document.querySelector("#residence-location").innerHTML =
residence.location;



document.querySelector("#hero-image").src =
residence.heroImage;



document.querySelector("#price").innerHTML =
residence.price;



document.querySelector("#bedrooms").innerHTML =
residence.bedrooms;



document.querySelector("#type").innerHTML =
residence.type;



document.querySelector("#developer").innerHTML =
residence.developer;



document.querySelector("#completion").innerHTML =
residence.completion;



document.querySelector("#overview").innerHTML =
residence.overview;



const highlights =
document.querySelector("#highlights");


residence.highlights.forEach(item=>{


highlights.innerHTML += `

<div class="highlight-card">

${item}

</div>

`;


});



}
