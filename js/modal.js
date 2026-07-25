/* ==========================================
   MODAL CONTROLLER
========================================== */


if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");

} else {


let modalOpen = false;


/* ==========================================
   OPEN MODAL
========================================== */


window.openModal = function(page,id){


    console.log(
        "OPEN MODAL:",
        id
    );


    const modal =
        document.getElementById("dealModal");


    const frame =
        document.getElementById("dealFrame");


    if(!modal || !frame){
        console.error("Missing modal elements");
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
       THIS CREATES THE BACK BUTTON STEP
    */

    history.pushState(
        {
            modal:true,
            property:id
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


    modalOpen=true;


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


    modalOpen=false;


}





/* ==========================================
   CLOSE BUTTON
========================================== */


window.closeDeal=function(){


    console.log(
        "CLOSE DEAL"
    );


    /*
       Go back one history entry.
       Same as browser back.
    */

    history.back();


};






/* ==========================================
   BROWSER BACK
========================================== */


window.addEventListener(
"popstate",
function(e){


    console.log(
        "POPSTATE",
        e.state
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
        e.key==="Escape" &&
        modalOpen
    ){

        closeDeal();

    }


});





/* ==========================================
   DIRECT URL LOAD
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


        if(modal && frame){


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


            modalOpen=true;

        }


    }


});


}
