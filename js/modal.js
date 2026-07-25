/* ==========================================
   MODAL CONTROLLER
========================================== */


if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");

} else {


let modalOpen = false;



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
       IMPORTANT:
       Replace, do not push.
       Modal is not a new browser page.
    */

    history.replaceState(
        {
            modal:true,
            property:id,
            page:page
        },
        "",
        url.pathname + url.search
    );



    frame.style.opacity="0";


    frame.onload=function(){

        frame.style.opacity="1";

    };



    frame.src =
        page +
        "?id=" +
        encodeURIComponent(id);



    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    document.documentElement.classList.add(
        "modal-open"
    );


    modalOpen=true;


};





/* ==========================================
   CLOSE MODAL ONLY
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
       Do not destroy iframe immediately.
       Prevents reload loops.
    */

    if(frame){

        frame.style.opacity="0";

    }



    modalOpen=false;


}





/* ==========================================
   CLOSE BUTTON
========================================== */


window.closeDeal=function(){


    console.log(
        "CLOSE DEAL"
    );


    hideModal();



    const url =
        new URL(window.location.href);



    url.searchParams.delete(
        "property"
    );


    url.searchParams.delete(
        "page"
    );



    history.replaceState(
        {},
        "",
        url.pathname
    );


};





/* ==========================================
   BROWSER BACK BUTTON
========================================== */


window.addEventListener(
"popstate",
function(){


    console.log(
        "POPSTATE CLOSE MODAL"
    );



    if(modalOpen){

        hideModal();

    }



});





/* ==========================================
   CLICK OUTSIDE MODAL
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
   ESC KEY
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
   DIRECT URL OPEN
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



    if(
        property &&
        page
    ){


        setTimeout(function(){


            openModal(
                page,
                property
            );


        },100);


    }


});


}
