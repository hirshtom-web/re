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


    const url =
        page + "#" + encodeURIComponent(id);


    console.log("IFRAME LOADING:", url);


    frame.src = url;


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


    frame.src = "";


    setTimeout(function(){

        window.scrollTo(
            0,
            savedScrollPosition
        );

    },50);

}
