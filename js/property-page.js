function loadPropertyPage(){


    const params =
    new URLSearchParams(
        window.location.search
    );


    const id =
    params.get("id");


    if(!id){

        console.error(
            "No property ID found"
        );

        return;

    }



    const property =
    window.properties.find(
        p => p.id === id
    );



    if(!property){

        console.error(
            "Property not found:",
            id
        );

        return;

    }



    console.log(
        "LOADED PROPERTY:",
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


}



document.addEventListener(
"DOMContentLoaded",
loadPropertyPage
);
