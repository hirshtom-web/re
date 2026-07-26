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
document.querySelector(".sheet-handle");


if(!sheet || !handle) return;



let startY = 0;
let startTranslate = 0;



function getY(){

    const matrix =
    new DOMMatrix(
        getComputedStyle(sheet).transform
    );

    return matrix.m42;

}



handle.addEventListener("pointerdown",e=>{


    startY = e.clientY;

    startTranslate = getY();


    handle.setPointerCapture(
        e.pointerId
    );


    sheet.classList.add("dragging");


});



handle.addEventListener("pointermove",e=>{


    if(!startY) return;


    let move =
    e.clientY - startY;


    let y =
    startTranslate + move;


    y = Math.max(
        0,
        Math.min(
            window.innerHeight * .75,
            y
        )
    );


    sheet.style.transform =
    `translateY(${y}px)`;


});



handle.addEventListener("pointerup",()=>{


    const y = getY();


    sheet.classList.remove(
        "dragging"
    );


    if(y < window.innerHeight * .4){

        // OPEN

        sheet.style.transform =
        "translateY(0px)";

    }
    else{

        // CLOSED

        sheet.style.transform =
        "translateY(75vh)";

    }


    startY=0;


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
