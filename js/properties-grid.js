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
PROPERTY SHEET
========================= */

function togglePropertySheet(){

    const sheet =
    document.querySelector(".property-sheet");

    if(sheet){

        sheet.classList.toggle("open");

    }

}

document.addEventListener("DOMContentLoaded",()=>{


const sheet = document.querySelector(".property-sheet");

if(!sheet) return;


let startY = 0;
let currentY = 0;
let startTransform = 0;


sheet.addEventListener("pointerdown",(e)=>{

    sheet.setPointerCapture(e.pointerId);

    startY = e.clientY;

    sheet.classList.add("dragging");


});


sheet.addEventListener("pointermove",(e)=>{


    if(!startY) return;


    let diff = e.clientY - startY;


    currentY = diff;


    sheet.style.transform =
    `translateY(calc(90vh - 130px + ${diff}px))`;


});


sheet.addEventListener("pointerup",()=>{


    sheet.classList.remove("dragging");


    if(currentY < -150){

        sheet.style.transform="translateY(0)";

    }
    else if(currentY > 150){

        sheet.style.transform=
        "translateY(calc(90vh - 130px))";

    }
    else{

        sheet.style.transform=
        "translateY(45vh)";

    }


    startY=0;
    currentY=0;


});


});
