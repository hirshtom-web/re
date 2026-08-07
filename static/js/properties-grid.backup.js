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
    src="${property.thumbnail || property.images?.[0] || ''}"
    alt="${property.title}"
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
                        ${property.title}
                    </h3>


                    <strong>
                        ${property.price || "Request Pricing"}
                    </strong>


                </div>



                <p>
    ${property.location || ""}
    ${property.neighborhood ? " · " + property.neighborhood : ""}
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

document.addEventListener("DOMContentLoaded", () => {

    const propertySheet =
        document.querySelector(".property-sheet");

    const propertyHeader =
        document.querySelector(".property-sheet .sheet-header");

    const filterSheet =
        document.querySelector(".filter-sheet");

    const filterHeader =
        document.querySelector(".filter-sheet-header");

    const filterButton =
        document.querySelector(".mobile-filter-button");


    if (!propertySheet || !propertyHeader) {

        console.warn("Property sheet elements missing.");

        return;

    }


    // ======================================
    // PROPERTY SHEET POSITIONS
    // ======================================

    function getCollapsedPosition() {

        return window.innerHeight - 180;

    }


    function setPropertySheet(position) {

        propertySheet.style.transform =
            `translateY(${position}px)`;

    }


    function collapsePropertySheet() {

        setPropertySheet(
            getCollapsedPosition()
        );

    }


    function openPropertySheet() {

        setPropertySheet(0);

    }


    // ======================================
    // INITIAL PROPERTY SHEET
    // ======================================

    collapsePropertySheet();


    // ======================================
    // PROPERTY SHEET DRAG
    // ======================================

    let startY = 0;
    let startTranslate = 0;
    let dragging = false;


    propertyHeader.addEventListener(
        "touchstart",
        (e) => {

            dragging = true;

            startY =
                e.touches[0].clientY;

            startTranslate =
                getPropertySheetY();

            propertySheet.classList.add("dragging");

        },
        { passive: true }
    );


    propertyHeader.addEventListener(
        "touchmove",
        (e) => {

            if (!dragging) {
                return;
            }


            const currentY =
                e.touches[0].clientY;


            let move =
                startTranslate +
                (currentY - startY);


            const closed =
                getCollapsedPosition();


            move =
                Math.max(
                    0,
                    Math.min(
                        closed,
                        move
                    )
                );


            propertySheet.style.transform =
                `translateY(${move}px)`;

        },
        { passive: true }
    );


    propertyHeader.addEventListener(
        "touchend",
        () => {

            if (!dragging) {
                return;
            }


            dragging = false;


            const closed =
                getCollapsedPosition();


            const current =
                getPropertySheetY();


            /*
             * If the sheet is more than halfway down,
             * collapse it.
             *
             * Otherwise bring it back up.
             */

            if (current > closed / 2) {

                collapsePropertySheet();

            }

            else {

                openPropertySheet();

            }


            propertySheet.classList.remove(
                "dragging"
            );


            startY = 0;

        }
    );


    function getPropertySheetY() {

        const style =
            window.getComputedStyle(propertySheet);


        if (
            !style.transform ||
            style.transform === "none"
        ) {

            return 0;

        }


        const matrix =
            new DOMMatrix(style.transform);


        return matrix.m42;

    }


    // ======================================
    // FILTER SHEET
    // ======================================

    if (!filterSheet) {

        console.warn("Filter sheet missing.");

        return;

    }


    function openFilters() {

        console.log("Opening filters");


        /*
         * Always collapse the property sheet
         * before opening filters.
         */

        collapsePropertySheet();


        /*
         * Open filter sheet.
         */

        filterSheet.classList.add("open");

        filterSheet.style.transform = "";

    }


    function closeFilters() {

        console.log("Closing filters");


        filterSheet.classList.remove("open");

        filterSheet.style.transform = "";


        /*
         * Keep property sheet collapsed.
         */

        collapsePropertySheet();

    }


    // ======================================
    // FILTER BUTTON
    // ======================================

    if (filterButton) {

        filterButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                openFilters();

            }
        );

    }


    // ======================================
    // FILTER SHEET DRAG
    // ======================================

    if (filterHeader) {

        let filterStartY = 0;
        let filterCurrentY = 0;
        let filterDragging = false;


        filterHeader.addEventListener(
            "touchstart",
            (e) => {

                if (
                    !filterSheet.classList.contains("open")
                ) {

                    return;

                }


                filterDragging = true;

                filterStartY =
                    e.touches[0].clientY;

                filterCurrentY = 0;

                filterSheet.classList.add(
                    "dragging"
                );

            },
            { passive: true }
        );


        filterHeader.addEventListener(
            "touchmove",
            (e) => {

                if (!filterDragging) {
                    return;
                }


                filterCurrentY =
                    e.touches[0].clientY -
                    filterStartY;


                /*
                 * Only allow downward movement.
                 */

                if (filterCurrentY > 0) {

                    filterSheet.style.transform =
                        `translateY(${filterCurrentY}px)`;

                }

            },
            { passive: true }
        );


        filterHeader.addEventListener(
            "touchend",
            () => {

                if (!filterDragging) {
                    return;
                }


                filterDragging = false;


                filterSheet.classList.remove(
                    "dragging"
                );


                /*
                 * Dragged far enough:
                 * close the filter sheet.
                 */

                if (filterCurrentY > 120) {

                    closeFilters();

                }

                else {

                    /*
                     * Snap back to fully open.
                     */

                    filterSheet.style.transform = "";

                }


                filterCurrentY = 0;

            }
        );

    }


    // ======================================
    // GLOBAL ACCESS
    // ======================================

    window.openFilters =
        openFilters;

    window.closeFilters =
        closeFilters;

});
