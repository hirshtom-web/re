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
const handle = document.querySelector(".sheet-handle");


if(!sheet || !handle) return;



let startY = 0;
let currentY = 0;
let startPosition = 0;



function getCurrentPosition(){

    const transform =
    window.getComputedStyle(sheet).transform;


    if(transform === "none"){
        return 0;
    }


    const matrix =
    new DOMMatrix(transform);


    return matrix.m42;

}



handle.addEventListener("pointerdown", e=>{


    startY = e.clientY;

    startPosition = getCurrentPosition();


    handle.setPointerCapture(e.pointerId);


    sheet.classList.add("dragging");


});



handle.addEventListener("pointermove", e=>{


    if(!startY) return;


    currentY = e.clientY - startY;


    let newPosition =
    startPosition + currentY;



    const collapsed =
    window.innerHeight * 0.775;


    newPosition = Math.max(
        0,
        Math.min(
            collapsed,
            newPosition
        )
    );



    sheet.style.transform =
    `translateY(${newPosition}px)`;


});



handle.addEventListener("pointerup",()=>{


    sheet.classList.remove("dragging");



    const collapsed =
    window.innerHeight * 0.775;



    const current =
    getCurrentPosition();



    if(current < 150){

        // OPEN

        sheet.style.transform =
        "translateY(0px)";

    }

    else if(current > collapsed - 80){

        // CLOSED

        sheet.style.transform =
        `translateY(${collapsed}px)`;

    }

    else{

        // HALF

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
