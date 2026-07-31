let currentProperty = null;



function startPropertyRenderer(){


    currentProperty = window.currentProperty;


    if(!currentProperty){

        console.warn(
            "No property data found."
        );

        return;

    }


    console.log(
        "PROPERTY RENDERER STARTED:",
        currentProperty
    );


    renderProperty(currentProperty);

}



window.addEventListener(
    "propertyLoaded",
    startPropertyRenderer
);



if(window.currentProperty){

    startPropertyRenderer();

}





function renderProperty(data){


    console.log(
        "RENDERING PROPERTY:",
        data
    );


    window.currentProperty = data;



    // Gallery
    if(typeof initGallery === "function"){
        initGallery(data);
    }



    // Main sections

    if(typeof renderPropertyHighlights === "function"){
        renderPropertyHighlights(data);
    }


    if(typeof renderFacts === "function"){
        renderFacts(data);
    }


    if(typeof renderPropertyIntelligence === "function"){
        renderPropertyIntelligence(data);
    }



    // Location

    if(typeof renderLocationMap === "function"){
        renderLocationMap(data);
    }


    if(typeof renderNearby === "function"){
        renderNearby(data);
    }



    // Lifestyle

    if(typeof renderNeighborhoodLifestyle === "function"){
        renderNeighborhoodLifestyle(data);
    }


    if(typeof renderLifestyleExperiences === "function"){
        renderLifestyleExperiences(data);
    }



    // Building

    if(typeof renderAmenities === "function"){
        renderAmenities(data);
    }


    if(typeof renderResidenceCollection === "function"){
        renderResidenceCollection(data);
    }



    // Design

    if(typeof renderArchitecture === "function"){
        renderArchitecture(data);
    }


    if(typeof renderDesignTeam === "function"){
        renderDesignTeam(data);
    }



    // Development

    if(typeof renderTimeline === "function"){
        renderTimeline(data);
    }



    // Financial

    if(typeof renderFinancial === "function"){
        renderFinancial(data);
    }



    // FAQ

    if(typeof renderFAQ === "function"){
        renderFAQ(data);
    }


    
    // Residence Table

    if(typeof renderResidenceTable === "function"){
       renderResidenceTable(data);
    }


    

    

    console.log(
        "PROPERTY RENDER COMPLETE"
    );


}
