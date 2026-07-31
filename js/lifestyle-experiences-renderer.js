function renderLifestyleExperiences(data){

    const lifestyleSlider =
    document.getElementById("lifestyle-slider");


    if(!lifestyleSlider || !data.lifestyleExperiences){
        return;
    }


    lifestyleSlider.innerHTML = "";


    data.lifestyleExperiences.forEach(item=>{


        const slide =
        document.createElement("div");


        slide.className =
        "lifestyle-slide";


        slide.innerHTML = `

            <img 
                src="${item.image}"
                alt="${item.title}"
            >

            <div class="slide-overlay">

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.text}
                </p>

            </div>

        `;


        lifestyleSlider.appendChild(slide);


    });

}
