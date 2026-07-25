/* ==========================================
   STOP MODAL SCRIPT INSIDE IFRAME
========================================== */

if (window.self !== window.top) {

    console.log("Modal JS skipped inside iframe");

} else {



let savedScrollPosition = 0;



/* ==========================================
   OPEN PROPERTY MODAL
========================================== */

function openModal(page, id, skipHistory = false){


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
       Create history entry only
       when user clicks a property
    */

    if(!skipHistory){


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



        history.pushState(
            {
                modal:true,
                property:id,
                page:page
            },
            "",
            url.pathname +
            url.search
        );


    }





    /*
       Load iframe property page
    */


    frame.style.opacity = "0";


    modal.classList.add(
        "loading"
    );



    frame.src =
        page +
        "?id=" +
        encodeURIComponent(id);




    frame.onload = function(){


        frame.style.opacity = "1";


        modal.classList.remove(
            "loading"
        );


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


function closeDeal(removeURL = true){


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


    modal.classList.remove(
        "loading"
    );



    document.documentElement.classList.remove(
        "modal-open"
    );


    document.body.classList.remove(
        "modal-open"
    );




    frame.style.opacity = "0";


    frame.src = "";






    if(removeURL){


        const url =
            new URL(
                window.location.href
            );


        url.searchParams.delete(
            "property"
        );


        url.searchParams.delete(
            "page"
        );



        history.replaceState(
            {},
            "",
            url.pathname +
            url.search
        );


    }




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


    if(e.key === "Escape"){


        const modal =
            document.getElementById(
                "dealModal"
            );



        if(
            modal &&
            modal.classList.contains(
                "active"
            )
        ){

            closeDeal();

        }


    }


});






/* ==========================================
   CLICK OUTSIDE CLOSE
========================================== */


const dealModal =
document.getElementById(
    "dealModal"
);



if(dealModal){


    dealModal.addEventListener(
    "click",
    function(e){


        if(e.target === dealModal){

            closeDeal();

        }


    });


}






/* ==========================================
   RESTORE MODAL AFTER REFRESH
========================================== */


document.addEventListener(
"DOMContentLoaded",
function(){


    const params =
        new URLSearchParams(
            window.location.search
        );



    const propertyID =
        params.get(
            "property"
        );



    const page =
        params.get(
            "page"
        );



    if(
        propertyID &&
        page
    ){


        openModal(
            page,
            propertyID,
            true
        );


    }


});







/* ==========================================
   BROWSER BACK / FORWARD
========================================== */


window.addEventListener(
"popstate",
function(){


    console.log(
        "POPSTATE",
        window.location.href
    );



    const params =
        new URLSearchParams(
            window.location.search
        );



    const propertyID =
        params.get(
            "property"
        );



    if(!propertyID){


        closeDeal(false);


    }


});



}
