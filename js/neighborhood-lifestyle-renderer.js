function renderNeighborhoodLifestyle(data){


    const lifestyleGrid =
    document.getElementById("lifestyle-grid");


    const lifestyleIntro =
    document.getElementById("lifestyle-intro");



    if(lifestyleIntro && data.lifestyleIntro){

        lifestyleIntro.textContent =
        data.lifestyleIntro;

    }



    if(!lifestyleGrid || !data.lifestyleHighlights){
        return;
    }



    lifestyleGrid.innerHTML = "";



    data.lifestyleHighlights.forEach(item=>{


        const card =
        document.createElement("div");


        card.className =
        "lifestyle-card";


        card.innerHTML = `

            <span class="material-symbols-outlined">
                ${item.icon || "location_on"}
            </span>

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.text}
            </p>

        `;


        lifestyleGrid.appendChild(card);


    });


}
