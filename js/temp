

/* =========================
   AI MODAL LOAD
========================= */

document.addEventListener("DOMContentLoaded", async () => {


    const container =
    document.getElementById(
        "ai-modal-container"
    );


    if(container){


        try{


            const response =
            await fetch(
                "../tools/ai-modal.html"
            );


            if(!response.ok){

                throw new Error(
                    "AI modal missing"
                );

            }


            container.innerHTML =
            await response.text();


            initAIModal();


        }catch(error){


            console.error(
                "AI Modal:",
                error
            );


        }


    }


    renderFAQ();
    initFAQAccordion();
    initFAQToggle();


});





/* =========================
   AI MODAL
========================= */


function initAIModal(){


    const aiButton =
    document.querySelector(".ai-rating");


    const aiModal =
    document.getElementById("aiModal");


    const close =
    document.getElementById("closeAiModal");



    if(!aiButton || !aiModal){

        return;

    }



    aiButton.addEventListener("click",()=>{


        aiModal.classList.add("active");


    });



    if(close){


        close.addEventListener("click",()=>{


            aiModal.classList.remove("active");


        });


    }



    aiModal.addEventListener("click",(e)=>{


        if(e.target === aiModal){


            aiModal.classList.remove("active");


        }


    });


}







/* =========================
   MEDIA LIBRARY
========================= */


function openMediaLibrary(
    planUrl = null,
    title = null,
    type = "photos"
){


    const mediaLibrary =
    document.getElementById("mediaLibrary");


    const mediaContent =
    document.getElementById("mediaContent");


    if(!mediaLibrary || !mediaContent){
        return;
    }


    mediaContent.innerHTML = "";



    if(type === "floorplans"){


        const viewer =
        document.createElement("iframe");


        viewer.src = planUrl;


        viewer.className =
        "plan-viewer";


        viewer.title =
        title || "Floor Plan";


        mediaContent.appendChild(viewer);


    } else {


        const galleryImages =
        document.querySelectorAll(
            ".gallery-feature img, .gallery-grid img"
        );


        galleryImages.forEach(img=>{


            const newImg =
            document.createElement("img");


            newImg.src =
            img.src;


            newImg.alt =
            img.alt;


            mediaContent.appendChild(newImg);


        });

    }



    mediaLibrary.classList.add("active");


}






/* =========================
   FAVORITE BUTTONS
========================= */


document.addEventListener("DOMContentLoaded",()=>{


    document.querySelectorAll(
        ".property-favorite"
    )
    .forEach(button=>{


        button.addEventListener(
            "click",
            event=>{


                event.stopPropagation();


            }
        );


    });


});





/* =========================
   FLOOR PLAN MEDIA PORTAL
========================= */


document.addEventListener("click",(e)=>{


    const plan =
    e.target.closest(".plan-link");


    if(!plan) return;


    openMediaLibrary(
        plan.dataset.plan,
        plan.dataset.title,
        "floorplans"
    );


});
