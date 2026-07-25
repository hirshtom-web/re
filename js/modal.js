let savedScrollPosition = 0;


/* ==========================================
   OPEN PROPERTY MODAL
========================================== */

function openModal(page, id, restore = false){

    console.log("OPENING PROPERTY:", id);

    const modal = document.getElementById("dealModal");
    const frame = document.getElementById("dealFrame");


    if(!modal || !frame){
        console.error("Modal elements missing");
        return;
    }


    savedScrollPosition = window.scrollY;

    window.currentPropertyID = id;



    /*
       ADD URL STATE ONLY WHEN USER CLICKS
       NOT WHEN RESTORING AFTER REFRESH/BACK
    */

    if(!restore){

        const cleanURL = new URL(window.location.href);

        cleanURL.searchParams.delete("property");
        cleanURL.searchParams.delete("page");


        const newURL =
            cleanURL.pathname +
            cleanURL.search +
            (cleanURL.search ? "&" : "?") +
            "property=" + encodeURIComponent(id) +
            "&page=" + encodeURIComponent(page);



        history.pushState(
            {
                property:id,
                page:page
            },
            "",
            newURL
        );

    }



    const iframeURL =
        page + "?id=" + encodeURIComponent(id);



    console.log("IFRAME LOADING:", iframeURL);



    frame.style.opacity = "0";

    modal.classList.add("loading");

    frame.src = iframeURL;



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

function closeDeal(updateURL = true){


    const modal = document.getElementById("dealModal");
    const frame = document.getElementById("dealFrame");



    if(!modal || !frame){
        return;
    }



    modal.classList.remove("active");
    modal.classList.remove("loading");



    if(updateURL){

        const url = new URL(window.location.href);


        url.searchParams.delete("property");
        url.searchParams.delete("page");



        history.replaceState(
            {},
            "",
            url.pathname + url.search
        );

    }



    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");



    frame.style.opacity = "0";

    frame.src = "";

    frame.removeAttribute("src");



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
   CLICK OUTSIDE CLOSE
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
   RESTORE AFTER REFRESH
========================================== */

document.addEventListener("DOMContentLoaded",()=>{


    const params =
        new URLSearchParams(window.location.search);



    const propertyID =
        params.get("property");



    const page =
        params.get("page") || "residence.html";



    if(propertyID){


        setTimeout(()=>{


            openModal(
                page,
                propertyID,
                true
            );


        },100);


    }


});






/* ==========================================
   BROWSER BACK / FORWARD
========================================== */

window.addEventListener("popstate",()=>{


    const params =
        new URLSearchParams(window.location.search);



    const propertyID =
        params.get("property");



    const page =
        params.get("page") || "residence.html";



    if(propertyID){


        openModal(
            page,
            propertyID,
            true
        );


    } else {


        closeDeal(false);

    }


});
