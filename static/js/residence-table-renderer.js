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

    data.residences.forEach(item => {

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
