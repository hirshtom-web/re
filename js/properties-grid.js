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


const dragArea =
document.querySelector(".sheet-handle, .sheet-header");


if(!sheet || !dragArea) return;



let startY = 0;
let startPosition = 0;



function getTranslateY(){

    const transform =
    window.getComputedStyle(sheet).transform;


    if(transform === "none"){
        return 0;
    }


    return new DOMMatrix(transform).m42;

}




dragArea.addEventListener(
"pointerdown",
(e)=>{


    startY = e.clientY;


    startPosition = getTranslateY();


    dragArea.setPointerCapture(
        e.pointerId
    );


    sheet.classList.add(
        "dragging"
    );


});





dragArea.addEventListener(
"pointermove",
(e)=>{


    if(!startY) return;


    const diff =
    e.clientY - startY;


    let position =
    startPosition + diff;



    const closed =
    window.innerHeight - 180;



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





dragArea.addEventListener(
"pointerup",
(e)=>{


    sheet.classList.remove(
        "dragging"
    );


    const closed =
    window.innerHeight - 180;



    const position =
    getTranslateY();



    if(position < closed * 0.45){


        // OPEN

        sheet.style.transform =
        "translateY(0px)";


    }
    else{


        // COLLAPSED

        sheet.style.transform =
        `translateY(${closed}px)`;


    }



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
