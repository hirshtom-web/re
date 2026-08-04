function renderTimeline(data){

    const section =
        document.getElementById(
            "construction-section"
        );


    const timeline =
        document.getElementById(
            "construction-timeline"
        );


    if(
        !section ||
        !timeline
    ){
        return;
    }


    if(
        !data?.constructionTimeline ||
        !data.constructionTimeline.length
    ){

        section.style.display = "none";

        return;

    }



    section.style.display = "";


    timeline.innerHTML = "";


    data.constructionTimeline.forEach(step=>{


        const card =
            document.createElement("div");


        card.className =
            `timeline-step ${step.state || ""}`;


        card.innerHTML = `

            <span class="timeline-dot"></span>

            <div>

                <small>${step.year}</small>

                <strong>${step.title}</strong>

                ${
                    step.status
                    ? `<p>${step.status}</p>`
                    : ""
                }

            </div>

        `;


        timeline.appendChild(card);


    });

}
