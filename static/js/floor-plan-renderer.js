// ======================================
// RESIDENCE TABLE RENDERER
// ======================================

function renderResidenceTable(data){

    const tbody =
        document.getElementById("residence-table-body");

    if(!tbody || !data?.residences){
        return;
    }

    tbody.innerHTML = "";

    data.residences.forEach(item=>{

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>

            <td>${item.bedrooms}</td>

            <td>${item.bathrooms}</td>

            <td>${item.interior}</td>

            <td class="plan-cell">

                <button
                    class="plan-link"
                    data-plan="${item.layout}"
                    data-title="${item.name} Floor Plan">

                    <img
                        src="${item.preview || item.layout}"
                        class="plan-thumb"
                        alt="${item.name} Floor Plan">

                </button>

            </td>
        `;

        tbody.appendChild(row);

    });

}



// ======================================
// FLOOR PLAN MEDIA PORTAL
// ======================================

document.addEventListener("click",(e)=>{

    const plan =
        e.target.closest(".plan-link");

    if(!plan){
        return;
    }

    openMediaLibrary(
        plan.dataset.plan,
        plan.dataset.title,
        "floorplans"
    );

});



// ======================================
// RESIDENCE TABLE TOGGLE
// ======================================

function initResidenceTable(){

    const table =
        document.querySelector(".units-table");

    const toggle =
        document.querySelector(".table-toggle");


    if(!toggle || !table){
        return;
    }


    toggle.addEventListener("click",()=>{

        table.classList.toggle("expanded");


        toggle.textContent =
            table.classList.contains("expanded")
            ?
            "Show Less"
            :
            "View All Floor Plans";

    });

}
