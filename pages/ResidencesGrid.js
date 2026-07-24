function renderResidencesGrid(){

    const container = document.getElementById("property-grid");

    if(!container) return;


    container.innerHTML = window.propertyGrid
    .map(property => createPropertyCard(property))
    .join("");

}


document.addEventListener("DOMContentLoaded", () => {

    renderResidencesGrid();

});
