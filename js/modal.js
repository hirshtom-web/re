let savedScrollPosition = 0;


/* ==========================================
   OPEN PROPERTY MODAL
========================================== */

function openModal(page, id){

    const modal =
        document.getElementById("dealModal");

    const frame =
        document.getElementById("dealFrame");


    savedScrollPosition = window.scrollY;


    // Save current property
    window.currentPropertyID = id;


    const url =
        page + "#" + encodeURIComponent(id);


    console.log("IFRAME LOADING:", url);


    // Fade iframe while loading
    frame.style.opacity = "0";


    frame.src = url;


    frame.onload = function(){

        frame.style.opacity = "1";

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


    modal.classList.remove("active");


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
        modal.classList.contains("active")
    ){

        closeDeal();

    }

});


/* ==========================================
   CLICK OUTSIDE TO CLOSE
========================================== */

const dealModal = document.getElementById("dealModal");

if(dealModal){

    dealModal.addEventListener("click",(e)=>{

        if(e.target === dealModal){

            closeDeal();

        }

    });

}
