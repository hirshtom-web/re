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

    if(!sheet || !handle || !button){

        return;

    }



    // =========================
    // OPEN / CLOSE
    // =========================

    function openFilters(){

        sheet.classList.add("open");

    }



    function closeFilters(){

        sheet.classList.remove("open");

        sheet.style.transform = "";

    }



    function toggleFilters(){

        if(sheet.classList.contains("open")){

            closeFilters();

        }

        else{

            openFilters();

        }

    }



    window.openFilters = openFilters;
    window.closeFilters = closeFilters;



    button.onclick = toggleFilters;



    // =========================
    // DRAG TO CLOSE
    // =========================

    let startY = 0;
    let currentY = 0;
    let dragging = false;



    handle.addEventListener("touchstart",(e)=>{

        dragging = true;

        startY =
        e.touches[0].clientY;

        sheet.classList.add("dragging");

    },{passive:true});



    handle.addEventListener("touchmove",(e)=>{

        if(!dragging) return;

        currentY =
        e.touches[0].clientY - startY;

        if(currentY > 0){

            sheet.style.transform =
            `translateY(${currentY}px)`;

        }

    },{passive:true});



    handle.addEventListener("touchend",()=>{

        dragging = false;

        sheet.classList.remove("dragging");

        if(currentY > 120){

            closeFilters();

        }

        else{

            sheet.style.transform = "";

        }

        currentY = 0;

    });

});
