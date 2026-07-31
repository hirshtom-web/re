function renderLifestyle(data){


    const lifestyleGrid =
    document.getElementById("lifestyle-grid");


    const lifestyleIntro =
    document.getElementById("lifestyle-intro");



    if(lifestyleIntro && data.lifestyleIntro){

        lifestyleIntro.textContent =
        data.lifestyleIntro;

    }



    if(lifestyleGrid && data.lifestyleHighlights){


        lifestyleGrid.innerHTML="";


        data.lifestyleHighlights.forEach(item=>{


            const card =
            document.createElement("div");


            card.className =
            "lifestyle-card";


            card.innerHTML=`

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




    const slider =
    document.getElementById("lifestyle-slider");



    if(slider && data.lifestyleExperiences){


        slider.innerHTML="";


        data.lifestyleExperiences.forEach(item=>{


            const slide =
            document.createElement("div");


            slide.className =
            "lifestyle-slide";


            slide.innerHTML=`

                <img src="${item.image}"
                alt="${item.title}">


                <div class="slide-overlay">

                    <h3>${item.title}</h3>

                    <p>${item.text}</p>

                </div>

            `;


            slider.appendChild(slide);


        });

    }


}
