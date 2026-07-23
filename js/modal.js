let savedScrollPosition = 0;


/* ==========================================
   OPEN PROPERTY MODAL
========================================== */

function openModal(page, id){

    console.log("OPENING PROPERTY:", id);

    const modal =
        document.getElementById("dealModal");

    const frame =
        document.getElementById("dealFrame");

    if(!modal || !frame){
        console.error("Modal elements missing");
        return;
    }


    savedScrollPosition = window.scrollY;


    window.currentPropertyID = id;


    /*
        SAVE OPEN PROPERTY IN URL
    */

    history.pushState(
        null,
        "",
        "?property=" + encodeURIComponent(id)
    );


    const url =
        page + "?id=" + encodeURIComponent(id);


    console.log("IFRAME LOADING:", url);


    frame.style.opacity = "0";

    modal.classList.add("loading");

    frame.src = url;


    frame.onload = function(){

        frame.style.opacity = "1";

        modal.classList.remove("loading");

    };


    document.documentElement.classList.add("modal-open");

    document.body.classList.add("modal-open");


    modal.classList.add("active");

}


/* ==========================================
   CLOSE PROPERTY MODAL
========================================== */

function closeDeal(){

    const modal =
        document.getElementById("dealModal");

    const frame =
        document.getElementById("dealFrame");


    if(!modal || !frame){
        return;
    }


    modal.classList.remove("active");


    /*
        REMOVE PROPERTY FROM URL
    */

    history.pushState(
        null,
        "",
        window.location.pathname
    );


    document.documentElement.classList.remove("modal-open");

    document.body.classList.remove("modal-open");


    frame.style.opacity = "0";

    frame.src = "";


    setTimeout(function(){

        window.scrollTo(
            0,
            savedScrollPosition
        );

    },50);

}


/* ==========================================
   ESC TO CLOSE
========================================== */

document.addEventListener("keydown",(e)=>{

    const modal =
        document.getElementById("dealModal");


    if(
        e.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
    ){

        closeDeal();

    }

});



/* ==========================================
   CLICK OUTSIDE TO CLOSE
========================================== */

const dealModal =
document.getElementById("dealModal");


if(dealModal){

    dealModal.addEventListener("click",(e)=>{

        if(e.target === dealModal){

            closeDeal();

        }

    });

}



/* ==========================================
   RESTORE MODAL AFTER PAGE REFRESH
========================================== */

document.addEventListener("DOMContentLoaded",()=>{


    const params =
    new URLSearchParams(window.location.search);


    const propertyID =
    params.get("property");


    if(propertyID){

        openModal(
            "residence.html",
            propertyID
        );

    }

});
