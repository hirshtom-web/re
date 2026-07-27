// ======================================
// MOBILE FILTER SHEET CONTROLLER
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const sheet =
        document.querySelector(".filter-sheet");

    const handle =
        document.querySelector(".filter-sheet-header");

    const button =
        document.querySelector(".mobile-filter-button");


    if (!sheet || !handle || !button) {
        return;
    }


    // ======================================
    // OPEN
    // ======================================

    function openFilters() {

        sheet.classList.add("open");

        // Reset any previous drag transform
        sheet.style.transform = "";

    }


    // ======================================
    // CLOSE
    // ======================================

    function closeFilters() {

        sheet.classList.remove("open");

        sheet.style.transform = "";

    }


    // ======================================
    // TOGGLE
    // ======================================

    function toggleFilters() {

        if (sheet.classList.contains("open")) {

            closeFilters();

        } else {

            openFilters();

        }

    }


    // Make globally available
    window.openFilters = openFilters;
    window.closeFilters = closeFilters;


    // ======================================
    // FILTER BUTTON
    // ======================================

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        toggleFilters();

    });


    // ======================================
    // DRAG
    // ======================================

    let startY = 0;
    let currentY = 0;
    let dragging = false;


    handle.addEventListener("touchstart", (event) => {

        if (!sheet.classList.contains("open")) {
            return;
        }

        dragging = true;

        startY =
            event.touches[0].clientY;

        currentY = 0;

        sheet.classList.add("dragging");

    }, { passive: true });


    handle.addEventListener("touchmove", (event) => {

        if (!dragging) {
            return;
        }

        currentY =
            event.touches[0].clientY - startY;


        // Only allow dragging downward
        if (currentY > 0) {

            sheet.style.transform =
                `translateY(${currentY}px)`;

        }

    }, { passive: true });


    handle.addEventListener("touchend", () => {

        if (!dragging) {
            return;
        }

        dragging = false;

        sheet.classList.remove("dragging");


        // Close if dragged far enough
        if (currentY > 120) {

            closeFilters();

        } else {

            // Snap back open
            sheet.style.transform = "";

        }


        currentY = 0;

    });


});
