/* =========================
PROPERTY GRID RENDERER
========================= */

function renderPropertiesGrid(propertiesList = window.properties){


    const propertiesGrid =
    window.innerWidth <= 900
    ?
    document.getElementById("mobile-properties-grid")
    :
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


window.addEventListener(
    "propertiesLoaded",
    ()=>{

        renderPropertiesGrid();

    }
);


/* =========================
PROPERTY SHEET DRAG
========================= */

document.addEventListener("DOMContentLoaded",()=>{


const sheet =
document.querySelector(".property-sheet");


const handle =
document.querySelector(".property-sheet .sheet-handle");


if(!sheet || !handle) return;


let startY = 0;
let startPosition = 0;



function getTranslateY(){

    const style =
    window.getComputedStyle(sheet);

    const matrix =
    new DOMMatrix(style.transform);

    return matrix.m42;

}



handle.addEventListener(
"pointerdown",
(e)=>{


    startY = e.clientY;

    startPosition = getTranslateY();


    handle.setPointerCapture(
        e.pointerId
    );


    sheet.classList.add(
        "dragging"
    );


});



handle.addEventListener(
"pointermove",
(e)=>{


    if(!startY) return;


    const difference =
    e.clientY - startY;


    let position =
    startPosition + difference;



    const closed =
    window.innerHeight * 0.78;



    position = Math.max(
        0,
        Math.min(
            closed,
            position
        )
    );


    sheet.style.transform =
    `translateY(${position}px)`;


});



handle.addEventListener(
"pointerup",
()=>{


    const closed =
    window.innerHeight * 0.78;


    const position =
    getTranslateY();



    if(position < closed/2){

        sheet.style.transform =
        "translateY(0px)";

    }
    else{

        sheet.style.transform =
        `translateY(${closed}px)`;

    }


    sheet.classList.remove(
        "dragging"
    );


    startY = 0;


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
