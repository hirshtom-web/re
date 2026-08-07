console.log("PROPERTY PAGE READY");


function loadProperty(property){

    if(!property){

        console.warn(
            "NO PROPERTY PROVIDED"
        );

        return;

    }


    console.log(
        "PROPERTY DATA LOADED:",
        property
    );


    window.currentProperty = property;


    window.dispatchEvent(
        new CustomEvent(
            "propertyLoaded",
            {
                detail: property
            }
        )
    );

}


function renderPropertyPage(property){

    if(!property){
        return;
    }


    console.log(
        "PROPERTY PAGE LOADED:",
        property
    );


    window.currentProperty = property;


    window.dispatchEvent(
        new CustomEvent(
            "propertyLoaded",
            {
                detail: property
            }
        )
    );

}



/*
    IFRAME MODE
*/

window.addEventListener(
    "message",
    function(event){


        if(
            !event.data ||
            event.data.type !== "PROPERTY_DATA"
        ){
            return;
        }


        console.log(
            "IFRAME PROPERTY RECEIVED:",
            event.data.property
        );


        renderPropertyPage(
            event.data.property
        );


    }
);



/*
    Tell parent iframe we are ready
*/

if(window.parent !== window){

    window.parent.postMessage(
        {
            type:"PROPERTY_READY"
        },
        "*"
    );

}



