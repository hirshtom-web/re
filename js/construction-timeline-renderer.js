// ======================================
// CONSTRUCTION TIMELINE RENDERER
// ======================================

function renderTimeline(data){

    const timeline =
        document.getElementById("construction-timeline");


    if(!timeline || !data?.constructionTimeline){
        return;
    }


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
