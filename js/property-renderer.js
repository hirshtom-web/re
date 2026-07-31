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



    // FAQ

    if(typeof renderFAQ === "function"){
        renderFAQ(data);
    }


    
    // Mortgage Calculator
  
    if(typeof loadPropertyMortgageCalculator === "function"){
       loadPropertyMortgageCalculator(data);
    }


  
    // Financial Overview

    if(typeof loadFinancialOverview === "function"){
       loadFinancialOverview();
    }



    // AI Modal

    if(typeof loadAIModal === "function"){
       loadAIModal();
    }


    
    // Floor Plans

    if(typeof renderResidenceTable === "function"){
    renderResidenceTable(data);
    }

    if(typeof initResidenceTable === "function"){
    initResidenceTable();
    }




    
    console.log(
        "PROPERTY RENDER COMPLETE"
    );


}
