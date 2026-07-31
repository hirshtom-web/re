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



    if(typeof initGallery === "function"){
        initGallery(data);
    }



    if(typeof renderPropertyHighlights === "function"){
        renderPropertyHighlights(data);
    }


    if(typeof renderFacts === "function"){
        renderFacts(data);
    }


    if(typeof renderPropertyIntelligence === "function"){
        renderPropertyIntelligence(data);
    }


    if(typeof renderResidenceCollection === "function"){
        renderResidenceCollection(data);
    }


    if(typeof renderNearby === "function"){
        renderNearby(data);
    }


    if(typeof renderNeighborhoodLifestyle === "function"){
    renderNeighborhoodLifestyle(data);
    }


    if(typeof renderLifestyleExperiences === "function"){
    renderLifestyleExperiences(data);
    }


    if(typeof renderAmenities === "function"){
        renderAmenities(data);
    }


    if(typeof renderArchitecture === "function"){
    renderArchitecture(data);
    }


    if(typeof renderDesignTeam === "function"){
    renderDesignTeam(data);
    }

    
    if(typeof renderLocationMap === "function"){
    renderLocationMap(data);
    }


    if(typeof renderTimeline === "function"){
        renderTimeline(data);
    }


    if(typeof renderFinancial === "function"){
        renderFinancial(data);
    }


    if(typeof renderFAQ === "function"){
        renderFAQ(data);
    }



    console.log(
        "PROPERTY RENDER COMPLETE"
    );


}



