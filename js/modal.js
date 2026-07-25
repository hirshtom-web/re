/* ==========================================
   STOP MODAL SCRIPT INSIDE IFRAME
========================================== */

if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");

} else {


let savedScrollPosition = 0;
let modalOpen = false;



/* ==========================================
   OPEN PROPERTY MODAL
========================================== */

function openModal(page, id, skipHistory = false){


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



    savedScrollPosition =
        window.scrollY;



    /*
       ONLY CREATE HISTORY
       WHEN USER CLICKS
    */

    if(!skipHistory){


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


        history.pushState(
            {
                modal:true,
                property:id,
                page:page
            },
            "",
            url.pathname + url.search
        );

    }



    frame.style.opacity="0";


    frame.src =
        page +
        "?id=" +
        encodeURIComponent(id);



    frame.onload=function(){

        frame.style.opacity="1";

    };



    document.documentElement.classList.add(
        "modal-open"
    );


    document.body.classList.add(
        "modal-open"
    );


    modal.classList.add(
        "active"
    );


    modalOpen=true;


}







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



    if(!modal){
        return;
    }



    modal.classList.remove(
        "active"
    );


    modal.classList.remove(
        "loading"
    );



    document.documentElement.classList.remove(
        "modal-open"
    );


    document.body.classList.remove(
        "modal-open"
    );



    if(frame){

        frame.removeAttribute(
            "src"
        );

    }



    modalOpen=false;



    setTimeout(()=>{

        window.scrollTo(
            0,
            savedScrollPosition
        );

    },50);


}







/* ==========================================
   CLOSE BUTTON / ESC
========================================== */

function closeDeal(){


    console.log(
        "CLOSE MODAL"
    );



    const url =
        new URL(window.location.href);



    url.searchParams.delete(
        "property"
    );


    url.searchParams.delete(
        "page"
    );



    /*
       GO BACK ONE HISTORY STEP
       instead of replacing it
    */

    history.back();


}







/* ==========================================
   ESC KEY
========================================== */

document.addEventListener(
"keydown",
function(e){


    if(
        e.key==="Escape" &&
        modalOpen
    ){

        closeDeal();

    }


});







/* ==========================================
   CLICK OUTSIDE
========================================== */

const modal =
document.getElementById("dealModal");


if(modal){


    modal.addEventListener(
    "click",
    function(e){


        if(e.target === modal){

            closeDeal();

        }


    });


}







/* ==========================================
   BACK / FORWARD BUTTON
========================================== */

window.addEventListener(
"popstate",
function(e){


    console.log(
        "POPSTATE:",
        window.location.href
    );



    const params =
        new URLSearchParams(
            window.location.search
        );



    const property =
        params.get("property");


    const page =
        params.get("page");



    /*
       FORWARD BUTTON
       URL HAS PROPERTY
    */

    if(property && page){


        openModal(
            page,
            property,
            true
        );


        return;

    }



    /*
       BACK BUTTON
       URL CLEAN
    */

    hideModal();



});







/* ==========================================
   OPEN FROM DIRECT URL
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


        openModal(
            page,
            property,
            true
        );


    }


});



}
