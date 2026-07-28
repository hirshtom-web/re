// ======================================
// MOBILE FILTER SHEET CONTROLLER
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const sheet = document.querySelector(".filter-sheet");
    const button = document.querySelector(".mobile-filter-button");
    const header = document.querySelector(".filter-sheet-header");

    if (!sheet || !button || !header) {
        console.warn("Mobile filter sheet elements not found.");
        return;
    }


    // ======================================
    // OPEN
    // ======================================

    function openFilters() {

        console.log("OPEN FILTERS");

        sheet.classList.add("open");

        sheet.style.transform = "";

    }


    // ======================================
    // CLOSE
    // ======================================

    function closeFilters() {

        console.log("CLOSE FILTERS");

        sheet.classList.remove("open");

        sheet.style.transform = "";

    }


    // ======================================
    // BUTTON
    // ======================================

    button.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        openFilters();

    });


    // ======================================
    // GLOBAL FUNCTIONS
    // ======================================

    window.openFilters = openFilters;
    window.closeFilters = closeFilters;


    // ======================================
    // DRAG FILTER SHEET
    // ======================================

    let startY = 0;
    let currentY = 0;
    let dragging = false;


    header.addEventListener("touchstart", (event) => {

        dragging = true;

        startY = event.touches[0].clientY;

        currentY = 0;

        sheet.classList.add("dragging");

    }, { passive: true });


    header.addEventListener("touchmove", (event) => {

        if (!dragging) {
            return;
        }

        currentY =
            event.touches[0].clientY - startY;


        if (currentY > 0) {

            sheet.style.transform =
                `translateY(${currentY}px)`;

        }

    }, { passive: true });


    header.addEventListener("touchend", () => {

        if (!dragging) {
            return;
        }

        dragging = false;

        sheet.classList.remove("dragging");


        if (currentY > 120) {

            closeFilters();

        } else {

            sheet.style.transform = "";

        }

        currentY = 0;

    });

});


document.querySelectorAll(".mobile-filter-title")
.forEach(button => {

    button.addEventListener("click", () => {

        button
        .closest(".mobile-filter-dropdown")
        .classList.toggle("open");

    });

});
