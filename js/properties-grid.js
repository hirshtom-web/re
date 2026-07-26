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


const sheet = document.querySelector(".property-sheet");

const dragArea = document.querySelector(
    ".property-sheet .sheet-handle, .property-sheet .sheet-header"
);


if(!sheet || !dragArea){
    console.log("Sheet drag elements missing");
    return;
}



let startY = 0;
let currentY = 0;



dragArea.addEventListener("pointerdown", e=>{


    startY = e.clientY;


    sheet.classList.add("dragging");


    dragArea.setPointerCapture(
        e.pointerId
    );


});



dragArea.addEventListener("pointermove", e=>{


    if(!startY) return;


    currentY = e.clientY - startY;


    let translate =
    window.innerHeight * 0.75 + currentY;


    translate = Math.max(
        0,
        Math.min(
            window.innerHeight * 0.75,
            translate
        )
    );


    sheet.style.transform =
    `translateY(${translate}px)`;


});



dragArea.addEventListener("pointerup",()=>{


    sheet.classList.remove("dragging");


    if(currentY < -80){

        // OPEN

        sheet.style.transform =
        "translateY(0px)";

    }
    else{

        // CLOSED

        sheet.style.transform =
        "translateY(75vh)";

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
