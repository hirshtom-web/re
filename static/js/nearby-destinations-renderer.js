// ======================================
// NEARBY DESTINATIONS RENDERER
// ======================================

function renderNearby(data){


    const nearbyGrid =
    document.getElementById(
        "nearby-grid"
    );


    if(!nearbyGrid || !data.nearby){

        return;

    }


    nearbyGrid.innerHTML="";


    data.nearby.forEach(item=>{


        const card =
        document.createElement("div");


        card.className =
        "nearby-card";


        card.innerHTML=`

            <span class="material-symbols-outlined">
                ${item.icon || "location_on"}
            </span>


            <div>

                <strong>
                    ${item.title}
                </strong>


                <p>
                    ${item.distance} away
                </p>

            </div>

        `;


        nearbyGrid.appendChild(card);


    });


}
