 /* =========================
   PROPERTY INTELLIGENCE
========================= */


const intelligence =
document.getElementById("property-intelligence");


if(intelligence && data.highlights){


    intelligence.innerHTML = "";


    data.highlights.forEach(item=>{


        const card =
        document.createElement("article");


        card.className = "info-card";


        card.innerHTML = `

            <h3>
                ${item.title}
            </h3>


            <p class="card-text">
                ${item.text}
            </p>


            <button class="read-more">
                Read more →
            </button>

        `;


        intelligence.appendChild(card);


    });


}
