/* =========================
   FINANCIAL OVERVIEW LOADER
========================= */


document.addEventListener("DOMContentLoaded",async()=>{


    const container =
    document.getElementById(
        "financial-overview"
    );


    if(!container) return;



    try{


        const response =
        await fetch(
            "../tools/financial-overview.html"
        );



        if(!response.ok){

            throw new Error(
                "Financial overview failed"
            );

        }



        container.innerHTML =
        await response.text();



    }catch(error){


        console.error(
            "Financial overview:",
            error
        );


    }


});







