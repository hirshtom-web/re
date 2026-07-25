/* ==========================================
   MODAL CONTROLLER
========================================== */

if (window.self !== window.top) {

    console.log("Modal skipped inside iframe");

} else {


let modalOpen = false;
let savedScrollPosition = 0;
let ignoreNextPop = false;



/* ==========================================
   OPEN
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
        console.error(
            "Modal elements missing"
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


    /*
       Only create history entry
       when opening
    */

    history.pushState(
        {
            modal:true,
            property:id
        },
        "",
        url.pathname + url.search
    );



    frame.onload=function(){
        frame.style.opacity="1";
    };


    frame.style.opacity="0";


    frame.src =
        page +
        "?id=" +
        encodeURIComponent(id);



    document.body.classList.add(
        "modal-open"
    );

    document.documentElement.classList.add(
        "modal-open"
    );


    modal.classList.add(
        "active"
    );


    modalOpen=true;


};




/* ==========================================
   CLOSE
========================================== */


function closeModalOnly(){


    console.log(
        "CLOSE MODAL"
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



    if(frame){

        /*
          Important:
          do NOT clear src immediately.
          Safari can trigger reload loops.
        */

        setTimeout(()=>{

            frame.src="";

        },300);

    }


    modalOpen=false;



}




/* ==========================================
   CLOSE BUTTON
========================================== */


window.closeDeal=function(){


    closeModalOnly();



    const url =
        new URL(window.location.href);



    url.searchParams.delete(
        "property"
    );


    url.searchParams.delete(
        "page"
    );



    /*
      Replace only.
      Never push.
    */

    history.replaceState(
        {},
        "",
        url.pathname
    );



    setTimeout(()=>{

        window.scrollTo(
            0,
            savedScrollPosition
        );

    },50);


};




/* ==========================================
   BACK BUTTON FIX
========================================== */


window.addEventListener(
"popstate",
function(e){


    console.log(
        "BACK EVENT",
        window.location.href
    );



    /*
       Browser already moved.
       Just kill modal.
    */

    if(modalOpen){

        closeModalOnly();

    }



});





/* ==========================================
   OUTSIDE CLICK
========================================== */


document.addEventListener(
"click",
function(e){


    const modal =
        document.getElementById("dealModal");


    if(
        modal &&
        e.target === modal &&
        modalOpen
    ){

        closeDeal();

    }


});





/* ==========================================
   ESCAPE
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


        setTimeout(()=>{


            openModal(
                page,
                property
            );


        },100);


    }


});



}
