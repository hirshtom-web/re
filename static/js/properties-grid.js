/* =========================
LIVE MLS PROPERTY GRID
========================= */

function renderPropertiesGrid(propertiesList = window.properties) {

    const grid =
        window.innerWidth <= 900
        ? document.getElementById("mobile-properties-grid")
        : document.getElementById("properties-grid");


    if (!grid) {
        console.error("properties-grid not found");
        return;
    }


    if (!propertiesList || !propertiesList.length) {
        console.error("No properties found");
        return;
    }


    grid.innerHTML = "";


    propertiesList.forEach(property => {


        grid.innerHTML += `

        <article
            class="property-card"
            data-property-id="${property.id}"
            onclick="openModal('residence.html','${property.id}')">


            <div class="property-card-image">


                <img
                    src="${property.thumbnail || property.images?.[0] || ''}"
                    alt="${property.title || 'Property'}"
                    onerror="this.style.display='none'">


                <span class="property-badge">
                    ${property.status || "Available"}
                </span>


                <button
                    class="property-favorite"
                    onclick="event.stopPropagation();">
                    ♡
                </button>


            </div>



            <div class="property-card-info">


                <div class="property-card-header">


                    <h3>
                        ${property.title || "Property"}
                    </h3>


                    <strong>
                        ${property.price || "Request Pricing"}
                    </strong>


                </div>



                <p>
                    ${property.location || ""}
                    ${property.neighborhood ? " · " + property.neighborhood : ""}
                </p>



                <div class="property-metrics">

                    ${property.bedrooms ? property.bedrooms + " Beds" : ""}
                    ${property.bathrooms ? " · " + property.bathrooms + " Baths" : ""}
                    ${property.sqft ? " · " + Number(property.sqft).toLocaleString() + " sqft" : ""}

                </div>


            </div>


        </article>

        `;


    });


    console.log("GRID RENDERED:", propertiesList.length);

}



/* Wait until page + MLS data are ready */

document.addEventListener("DOMContentLoaded", () => {

    if (window.properties) {
        renderPropertiesGrid(window.properties);
    }

});
