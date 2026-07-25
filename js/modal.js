function openModal(page,id){

    debugger;

    console.trace("WHO OPENED MODAL:", id);

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


function openModal(page, id){


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



    /*
       CREATE HISTORY ENTRY
    */

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



    /*
       LOAD IFRAME
    */


    frame.style.opacity = "0";


    frame.src =
        page +
        "?id=" +
        encodeURIComponent(id);



    frame.onload = function(){


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


    modalOpen = true;


}






/* ==========================================
   CLOSE MODAL VISUAL ONLY
========================================== */


function hideModal(){


    console.trace(
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



}






/* ==========================================
   CLOSE + REMOVE URL
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
   ESC CLOSE
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
   BACK / FORWARD BUTTON
========================================== */


window.addEventListener(
"popstate",
function(e){


    console.log(
        "POPSTATE:",
        window.location.href
    );



    /*
       NEVER OPEN MODAL HERE

       Browser already changed URL.
       Just close current modal.
    */


    if(modalOpen){

        hideModal();

    }



});








/* ==========================================
   OPEN FROM URL ONLY ON FIRST PAGE LOAD
========================================== */


document.addEventListener(
"DOMContentLoaded",
function(){


    /*
       Wait a moment.
       Prevents race with history navigation.
    */


    setTimeout(()=>{


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
            page &&
            !modalOpen
        ){


            console.log(
                "OPEN INITIAL URL PROPERTY"
            );


            /*
               IMPORTANT:
               replace current history entry
               so back returns to grid
            */


            openModal(
                page,
                property
            );


        }


    },100);



});



}
