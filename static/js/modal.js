/* ==========================================
   PROPERTY MODAL CONTROLLER
========================================== */


let modalOpen = false;

let activePropertyId = null;


function slugify(text){

    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-+|-+$/g,"");

}


/* ==========================================
   OPEN PROPERTY MODAL
========================================== */

window.openModal = function(page, id){

    console.log(
        "OPEN MODAL:",
        id
    );


    activePropertyId = id;

let property =
    window.properties?.find(
        p => p.id === id
    );


if(property){

    const slug =
        slugify(
            property.title || property.address || "property"
        );


history.pushState(
{
    property:id
},
"",
"/mls?property=" + slug + "/" + id
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



    /*
       Update URL but stay on MLS page
    */




frame.style.opacity = "0";


frame.onload = function(){

    frame.style.opacity = "1";


    const property =
        window.properties?.find(
            p => p.id === activePropertyId
        );


    console.log(
        "SENDING AFTER LOAD:",
        property
    );


    frame.contentWindow.postMessage(
        {
            type:"PROPERTY_DATA",
            property:property
        },
        "*"
    );

};


frame.src = "/residence.html";



    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    document.documentElement.classList.add(
        "modal-open"
    );


    modalOpen = true;

}

};




/* ==========================================
   SEND PROPERTY DATA TO IFRAME
========================================== */


window.addEventListener(
"message",
function(event){

    console.log(
        "MESSAGE FROM IFRAME:",
        event.data
    );


    console.log(
        "CURRENT ACTIVE ID:",
        activePropertyId
    );


    if(
        event.data &&
        event.data.type === "PROPERTY_READY"
    ){


        console.log(
            "PROPERTY REQUEST RECEIVED"
        );


        const property =
            window.properties?.find(
                p =>
                p.id === activePropertyId
            );


        console.log(
            "ACTIVE ID:",
            activePropertyId,
            "AVAILABLE:",
            window.properties?.map(p=>p.id)
        );


        console.log(
            "SENDING PROPERTY:",
            property
        );


        event.source.postMessage(
            {
                type:"PROPERTY_DATA",
                property:property
            },
            "*"
        );


    }

});




/* ==========================================
   CLOSE PROPERTY MODAL
========================================== */


window.closeDeal = function(){

    console.log(
        "CLOSE MODAL"
    );


    const modal =
        document.getElementById("dealModal");


    const frame =
        document.getElementById("dealFrame");


    if(modal){

        modal.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "modal-open"
    );


    document.documentElement.classList.remove(
        "modal-open"
    );


    history.pushState(
        {},
        "",
        "/mls"
    );



    if(frame){

        frame.src = "";

    }



    activePropertyId = null;


    modalOpen = false;


};





/* ==========================================
   ESC CLOSE
========================================== */


document.addEventListener(
"keydown",
function(event){


    if(
        event.key === "Escape" &&
        modalOpen
    ){

        closeDeal();

    }


});




/* ==========================================
   OPEN MODAL FROM URL
========================================== */

window.addEventListener(
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

        console.log(
            "OPENING FROM URL:",
            property,
            page
        );


        setTimeout(
            function(){

                openModal(
                    page,
                    property
                );

            },
            500
        );

    }


});

