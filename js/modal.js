/* ==========================================
   STOP INSIDE IFRAME
========================================== */

if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");

} else {


let savedScrollPosition = 0;


/* ==========================================
   OPEN MODAL
========================================== */


function openModal(page, id){


    console.log(
        "OPEN PROPERTY:",
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
       ADD HISTORY ENTRY
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
            property:id
        },
        "",
        url.pathname + url.search
    );



    /*
       LOAD FRAME
    */


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


}






/* ==========================================
   CLOSE MODAL
========================================== */


function closeDeal(){


    console.log(
        "CLOSE MODAL"
    );


    const modal =
        document.getElementById("dealModal");


    const frame =
        document.getElementById("dealFrame");



    if(!modal || !frame){

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



    frame.src="";



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


    if(e.key==="Escape"){

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
function(e){


    console.log(
        "BACK BUTTON",
        window.location.href
    );


    /*
       ALWAYS CLOSE MODAL
       DO NOT REOPEN
    */


    const modal =
        document.getElementById("dealModal");


    if(
        modal &&
        modal.classList.contains("active")
    ){

        const frame =
            document.getElementById("dealFrame");


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


    }


});






/* ==========================================
   OPEN FROM DIRECT URL ONLY
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


        if(modal &&
           !modal.classList.contains("active")){


            console.log(
                "OPEN FROM URL"
            );


            openModal(
                page,
                property
            );


        }


    }



});



}
