let currentProperty = null;


/* ==========================================
   START PROPERTY RENDERER
========================================== */

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



/* ==========================================
   LISTEN FOR PROPERTY LOAD
========================================== */

window.addEventListener(
    "propertyLoaded",
    startPropertyRenderer
);



// If property already loaded before this file ran
if(window.currentProperty){

    startPropertyRenderer();

}



/* ==========================================
   MAIN PROPERTY RENDER FUNCTION
========================================== */

function renderProperty(data){


    console.log(
        "RENDERING PROPERTY:",
        data
    );


    window.currentProperty = data;



    /*
        COMPONENT INITIALIZERS
    */


    if(typeof initGallery === "function"){

        initGallery(data);

    }



    /*
        SECTION RENDERERS
    */


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



/* ==========================================
   MAP LOADING HELPER
========================================== */

window.hideMapLoading = function(){


    setTimeout(()=>{


        const loader =
        document.querySelector(
            ".map-loading"
        );


        if(loader){


            loader.style.opacity="0";


            setTimeout(()=>{


                loader.style.display="none";


            },800);


        }


    },1500);


};








