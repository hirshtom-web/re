/* ==========================================
   STOP MODAL SCRIPT INSIDE IFRAME
========================================== */

if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");


} else {


let savedScrollPosition = 0;
let modalOpen = false;
let blockClicksUntil = 0;



/* ==========================================
   OPEN PROPERTY MODAL
========================================== */


function openModal(page, id){


    /*
       Prevent accidental reopen after BACK
    */

    if(Date.now() < blockClicksUntil){

        console.log(
            "BLOCKED ACCIDENTAL OPEN:",
            id
        );

        return;

    }



    console.trace(
        "OPEN MODAL CALLED:",
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



    /*
       Stop click-through
    */

    modal.style.pointerEvents="none";



    modal.classList.remove(
        "active"
    );



    document.documentElement.classList.remove(
        "modal-open"
    );


    document.body.classList.remove(
        "modal-open"
    );



    if(frame){

        frame.src="";

    }



    modalOpen=false;



    setTimeout(()=>{

        modal.style.pointerEvents="";

    },300);



}






/* ==========================================
   CLOSE MODAL + REMOVE URL
========================================== */


function closeDeal(){


    console.log(
        "CLOSE MODAL"
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
        url.pathname + url.search
    );



    setTimeout(()=>{


        window.scrollTo(
            0,
            savedScrollPosition
        );


    },50);


}






/* ==========================================
   ESC
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


        if(e.target===modal){

            closeDeal();

        }


    });


}






/* ==========================================
   BACK BUTTON
========================================== */


window.addEventListener(
"popstate",
function(){


    console.log(
        "POPSTATE:",
        window.location.href
    );



    /*
       Block any click event
       that follows immediately
    */

    blockClicksUntil =
        Date.now() + 500;



    if(modalOpen){

        hideModal();

    }



});






/* ==========================================
   OPEN DIRECT URL ONLY
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


        /*
           Direct page load only
        */

        setTimeout(()=>{


            openModal(
                page,
                property
            );


        },100);


    }


});



}
