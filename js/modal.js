/* ==========================================
   MODAL CONTROLLER
========================================== */


if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");

} else {


let modalOpen = false;
let modalState = false;
let opening = false;



/* ==========================================
   OPEN MODAL
========================================== */


window.openModal = function(page,id){


    if(opening){
        return;
    }


    opening = true;


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

        opening=false;
        return;

    }



    const url =
        new URL(
            window.location.href
        );


    url.searchParams.set(
        "property",
        id
    );


    url.searchParams.set(
        "page",
        page
    );



    /*
       Create ONE browser history state
    */

    history.pushState(
        {
            modal:true,
            property:id
        },
        "",
        url.pathname + url.search
    );


    modalState=true;



    frame.onload=function(){

        frame.style.opacity="1";

    };



    frame.style.opacity="0";


    /*
       Load iframe once
    */

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


    setTimeout(()=>{

        opening=false;

    },200);


};





/* ==========================================
   HIDE ONLY
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


    document.body.classList.remove(
        "modal-open"
    );


    document.documentElement.classList.remove(
        "modal-open"
    );



    /*
       Keep iframe alive.
       Prevent reload.
    */

    if(frame){

        frame.style.opacity="0";

    }



    modalOpen=false;
    modalState=false;


}





/* ==========================================
   CLOSE BUTTON
========================================== */


window.closeDeal=function(){


    console.log(
        "CLOSE DEAL"
    );



    if(modalState){

        /*
           Browser back removes our modal state
        */

        history.back();

    }
    else{

        hideModal();

    }


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
   OUTSIDE CLICK
========================================== */


document.addEventListener(
"mousedown",
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
   DIRECT URL
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


            modalOpen=true;

        }

    }


});


}
