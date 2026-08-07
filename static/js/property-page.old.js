console.log("PROPERTY PAGE READY");


"DOMContentLoaded",
function(){window.addEventListener(
"message",
function(event){


    console.log(
        "MESSAGE RECEIVED:",
        event.data
    );


    if(
        event.data &&
        event.data.type === "PROPERTY_DATA"
    ){


        const property =
            event.data.property;



        console.log(
            "LOADED PROPERTY:",
            property
        );



        if(!property){

            console.warn(
                "NO PROPERTY DATA RECEIVED"
            );

            return;

        }



        window.currentProperty =
            property;



/*
   START GALLERY
*/

function startGallery(){

    if(window.initGallery){

        console.log(
            "STARTING GALLERY:",
            property.images
        );

        window.initGallery(
            property
        );

        return true;
    }

    return false;
}


let galleryAttempts = 0;


const galleryTimer =
    setInterval(()=>{

        galleryAttempts++;


        if(startGallery()){

            clearInterval(
                galleryTimer
            );

        }


        if(galleryAttempts > 20){

            console.warn(
                "Gallery failed to load"
            );

            clearInterval(
                galleryTimer
            );

        }


    },100);



        /*
           Notify other property renderers
        */

        window.dispatchEvent(
            new CustomEvent(
                "propertyLoaded",
                {
                    detail: property
                }
            )
        );



    }


});





/*
   Tell parent iframe is ready
*/

window.parent.postMessage(
    {
        type:"PROPERTY_READY"
    },
    "*"
);



window.addEventListener(
"DOMContentLoaded",
function(){

    const parts =
        window.location.pathname
        .split("/")
        .filter(Boolean);


    if(
        parts[0] === "property" &&
        parts.length >= 3
    ){

        const id =
            parts[2];


        console.log(
            "DIRECT PROPERTY PAGE ID:",
            id
        );


        fetch(
            "/property-data/" + id
        )
        .then(
            response => response.json()
        )
        .then(
            property => {

                console.log(
                    "DIRECT PROPERTY FOUND:",
                    property
                );


                window.currentProperty =
                    property;


                window.dispatchEvent(
                    new CustomEvent(
                        "propertyLoaded",
                        {
                            detail: property
                        }
                    )
                );


                if(window.initGallery){

                    window.initGallery(property);

                }


                if(window.renderProperty){

                    window.renderProperty(property);

                }

            }
        )
        .catch(
            err => {

                console.error(
                    "DIRECT PROPERTY LOAD ERROR:",
                    err
                );

            }
        );

    }


});
