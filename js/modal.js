let savedScrollPosition = 0;


/* ==========================================
   OPEN PROPERTY MODAL
========================================== */

function openModal(page, id, restore = false){

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


    if (!restore) {

        const cleanURL = new URL(window.location.href);

cleanURL.searchParams.delete("property");
cleanURL.searchParams.delete("page");

        history.pushState(
    {
        previousURL: cleanURL.pathname + cleanURL.search
    },
    "",
    cleanURL.pathname +
    cleanURL.search +
    (cleanURL.search ? "&" : "?") +
    "property=" + encodeURIComponent(id) +
    "&page=" + encodeURIComponent(page)
);

    }

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
    RESTORE GRID URL
*/

const url = new URL(window.location.href);

url.searchParams.delete("property");
url.searchParams.delete("page");

history.pushState(
    {},
    "",
    url.pathname + url.search
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


    const savedPage =
    params.get("page") || "residence.html";


    if(propertyID){

        setTimeout(()=>{

            openModal(
    savedPage,
    propertyID,
    true
);

        },100);

    }

});


window.addEventListener("popstate", ()=>{

    const params =
    new URLSearchParams(window.location.search);

    const propertyID =
    params.get("property");

    if(!propertyID){

        closeDeal();

    }

});
