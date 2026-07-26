/* =========================
PROPERTY GRID RENDERER
========================= */

function renderPropertiesGrid(propertiesList = window.properties){


    const propertiesGrid =
    document.getElementById("properties-grid");


    if(!propertiesGrid || !propertiesList){

        console.error("Grid missing or properties data missing");

        return;

    }


    propertiesGrid.innerHTML = "";


    propertiesList.forEach(property=>{


        propertiesGrid.innerHTML += `

        <article
            class="property-card"
            data-property-id="${property.id}"
            onclick="openModal('residence.html','${property.id}')">


            <div class="property-card-image">


                <img
                    src="${property.images?.[0] || property.thumbnail || 'images/placeholder.jpg'}"
                    alt="${property.title}">


                <span class="property-badge">
                    ${property.status || "Available"}
                </span>


                <span class="property-tag">
                    ${property.type || "Luxury"}
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
                        ${property.title}
                    </h3>


                    <strong>
                        ${property.price || "Request Pricing"}
                    </strong>


                </div>



                <p>
                    ${property.location || ""}
                </p>


            </div>


        </article>

        `;


    });


}



/* Initial load */

document.addEventListener(
    "DOMContentLoaded",
    ()=>renderPropertiesGrid()
);



/* Global access */

window.renderProperties =
renderPropertiesGrid;


/* =========================
PROPERTY SHEET DRAG
========================= */

document.addEventListener("DOMContentLoaded",()=>{


const sheet = document.querySelector(".property-sheet");

if(!sheet) return;


let startY = 0;
let currentY = 0;


sheet.addEventListener("pointerdown", e=>{

    startY = e.clientY;

    sheet.setPointerCapture(e.pointerId);

    sheet.classList.add("dragging");

});



sheet.addEventListener("pointermove", e=>{


    if(!startY) return;


    currentY = e.clientY - startY;


    let startPosition =
    window.innerHeight * 0.775;


    let position =
    startPosition + currentY;


    position = Math.max(
        0,
        Math.min(
            window.innerHeight * 0.775,
            position
        )
    );


    sheet.style.transform =
    `translateY(${position}px)`;


});



sheet.addEventListener("pointerup",()=>{


    sheet.classList.remove("dragging");


    if(currentY < -120){

        // fully open

        sheet.style.transform =
        "translateY(0px)";

    }

    else if(currentY > 120){

        // collapsed

        sheet.style.transform =
        "translateY(calc(90vh - 115px))";

    }

    else{

        // middle position

        sheet.style.transform =
        "translateY(45vh)";

    }


    startY = 0;
    currentY = 0;


});


});



/* =========================
FILTER POPUP
========================= */

function openFilters(){

    const filterSheet =
    document.querySelector(".filter-sheet");


    if(filterSheet){

        filterSheet.classList.toggle("open");

    }

}
