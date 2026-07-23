document.addEventListener("DOMContentLoaded",()=>{

    const tbody =
    document.getElementById("residence-table-body");


    const data =
    window.currentResidence;


    if(!tbody || !data || !data.residences){
        console.log("No residence data found");
        return;
    }


    data.residences.forEach(item=>{


        const row =
        document.createElement("tr");


        row.innerHTML = `

        <td>${item.name}</td>

        <td>${item.bedrooms}</td>

        <td>${item.bathrooms}</td>

        <td>${item.interior}</td>

        <td>
            <button class="layout-btn">
            View Plan
            </button>
        </td>

        `;


        tbody.appendChild(row);


    });


});
