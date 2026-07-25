/* ==========================================
   MODAL CONTROLLER FINAL
========================================== */


if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");

} else {


let modalOpen = false;
let modalHistoryActive = false;



/* ==========================================
   OPEN PROPERTY MODAL
========================================== */


window.openModal = function(page, id){


    console.log(
        "OPEN MODAL:",
        id
    );


    const modal =
        document.getElementById("dealModal");


    const frame =
        document.getElementById("dealFrame");



    if(!modal || !frame){

        console.error(
            "Missing modal elements"
        );

        return;

    }



    const url =
        new URL(window.location.href);



    url.searchParams.set(
        "property",
        id
    );


    url.searchParams.set(
        "page",
        page
    );



    /*
       ONE history entry only.
       Browser back now closes modal.
    */

    history.pushState(
        {
            modal:true
        },
        "",
        url.pathname + url.search
    );


    modalHistoryActive = true;



    frame.style.opacity = "0";


    frame.onload = function(){

        frame.style.opacity = "1";

    };



    frame.src =
        page +
        "?id=" +
        encodeURIComponent(id) +
        "&embedded=true";



    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    document.documentElement.classList.add(
        "modal-open"
    );


    modalOpen = true;


};






/* ==========================================
   HIDE MODAL
========================================== */


function hideModal(){


    console.log(
        "HIDE MODAL"
    );


    const modal =
        document.getElementById("dealModal");


    const frame =
        document.getElementById("dealFrame");



    if(!modal)
        return;



    modal.classList.remove(
        "active"
    );



    document.body.classList.remove(
        "modal-open"
    );


    document.documentElement.classList.remove(
        "modal-open"
    );



    /*
       Keep iframe.
       Do NOT clear src.
    */

    if(frame){

        frame.style.opacity = "0";

    }



    modalOpen = false;
    modalHistoryActive = false;


}






/* ==========================================
   CLOSE BUTTON / MODAL BACK BUTTON
========================================== */


window.closeDeal = function(){


    console.log(
        "CLOSE DEAL"
    );



    if(modalHistoryActive){

        history.back();

    }
    else {

        hideModal();

    }


};






/* ==========================================
   BROWSER BACK
========================================== */


window.addEventListener(
"popstate",
function(){


    console.log(
        "POPSTATE"
    );



    if(modalOpen){

        hideModal();

    }


});






/* ==========================================
   CLICK OUTSIDE
========================================== */


document.addEventListener(
"click",
function(e){


    const modal =
        document.getElementById("dealModal");



    if(
        modal &&
        modal.classList.contains("active") &&
        e.target === modal
    ){

        closeDeal();

    }


});






/* ==========================================
   ESC
========================================== */


document.addEventListener(
"keydown",
function(e){


    if(
        e.key === "Escape" &&
        modalOpen
    ){

        closeDeal();

    }


});






/* ==========================================
   DIRECT LOAD
========================================== */


document.addEventListener(
"DOMContentLoaded",
function(){


    const params =
        new URLSearchParams(
            window.location.search
        );


    const property =
        params.get("property");


    const page =
        params.get("page");



    if(property && page){


        const modal =
            document.getElementById("dealModal");


        const frame =
            document.getElementById("dealFrame");



        if(
            modal &&
            frame
        ){

            frame.src =
                page +
                "?id=" +
                encodeURIComponent(property) +
                "&embedded=true";


            modal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );


            document.documentElement.classList.add(
                "modal-open"
            );


            modalOpen = true;

        }


    }


});


}
