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
document.querySelector(".property-sheet .sheet-header");


if(!sheet || !handle){

    console.log("Sheet drag elements missing");

    return;

}



let startY = 0;
let startTranslate = 0;



function getY(){

    const style =
    window.getComputedStyle(sheet);


    if(style.transform === "none"){
        return 0;
    }


    const matrix =
    new DOMMatrix(style.transform);


    return matrix.m42;

}





handle.addEventListener(
"touchstart",
(e)=>{


    startY =
    e.touches[0].clientY;


    startTranslate =
    getY();


    sheet.classList.add(
        "dragging"
    );


},
{passive:true}
);





handle.addEventListener(
"touchmove",
(e)=>{


    if(!startY) return;


    const currentY =
    e.touches[0].clientY;


    let move =
    startTranslate +
    (currentY - startY);



    const closed =
    window.innerHeight - 180;



    move =
    Math.max(
        0,
        Math.min(
            closed,
            move
        )
    );


    sheet.style.transform =
    `translateY(${move}px)`;


},
{passive:true}
);






handle.addEventListener(
"touchend",
()=>{


    const closed =
    window.innerHeight - 180;


    const current =
    getY();



    if(current < closed / 2){

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

    const propertySheet =
    document.querySelector(".property-sheet");


    if(!filterSheet || !propertySheet) return;


    filterSheet.classList.toggle("open");


    if(filterSheet.classList.contains("open")){


        // move property sheet completely down

        propertySheet.style.transform =
        "translateY(calc(100vh - 80px))";


    }
    else{


        // return property sheet

        propertySheet.style.transform =
        "translateY(75vh)";


    }

}



function closeFilters(){

    const filterSheet =
    document.querySelector(".filter-sheet");

    const propertySheet =
    document.querySelector(".property-sheet");


    if(!filterSheet || !propertySheet) return;



    // hide filters

    filterSheet.style.transform =
    `translateY(${window.innerHeight - 180}px)`;


    // bring properties back

    propertySheet.style.transform =
    `translateY(${window.innerHeight - 180}px)`;

}



/* =========================
FILTER SHEET DRAG
========================= */

document.addEventListener("DOMContentLoaded",()=>{


const sheet =
document.querySelector(".filter-sheet");


const handle =
document.querySelector(".filter-sheet .sheet-handle");


if(!sheet || !handle) return;



let startY = 0;
let startPosition = 0;



function getY(){

    const transform =
    getComputedStyle(sheet).transform;


    if(transform === "none"){
        return 0;
    }


    return new DOMMatrix(transform).m42;

}





handle.addEventListener("pointerdown",e=>{


    startY = e.clientY;

    startPosition = getY();


    handle.setPointerCapture(
        e.pointerId
    );


    sheet.classList.add("dragging");


});





handle.addEventListener("pointermove",e=>{


    if(!startY) return;


    const closed =
    window.innerHeight - 180;



    let position =
    startPosition + (e.clientY - startY);



    position =
    Math.max(
        0,
        Math.min(
            closed,
            position
        )
    );



    sheet.style.transform =
    `translateY(${position}px)`;


});






handle.addEventListener("pointerup",()=>{


    const closed =
    window.innerHeight - 180;



    const position =
    getY();



    if(position > closed / 2){


        // close filters

        closeFilters();


    }
    else{


        // keep open

        sheet.style.transform =
        "translateY(0px)";


    }



    sheet.classList.remove(
        "dragging"
    );


    startY = 0;


});


});
