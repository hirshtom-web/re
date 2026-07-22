/*
    Residence Renderer
    Populates luxury residence page from residence-data.js
*/


document.addEventListener("DOMContentLoaded", () => {


    if(typeof residenceData === "undefined"){
        console.warn("No residence data found.");
        return;
    }



    renderResidence(residenceData);



});





function renderResidence(data){



    /*
        HERO
    */


    const title = document.querySelector("h1");

    if(title){

        title.innerHTML = `
            ${data.title}

            <span>
                ${data.subtitle}
            </span>
        `;

    }



    const description = document.querySelector(".hero-content p");

    if(description){

        description.textContent = data.description;

    }





    /*
        HERO BUTTON
    */
    

const heroButton = document.querySelector(".hero-cta");

if(heroButton && data.cta){

    heroButton.textContent = data.cta;

}







    /*
        GALLERY
    */


    const galleryMain =
    document.querySelector(".gallery-main img");


    const thumbnails =
    document.querySelector(".gallery-thumbs");



    if(data.images && data.images.length){



        if(galleryMain){

            galleryMain.src = data.images[0];

        }



        if(thumbnails){


            thumbnails.innerHTML = "";



            data.images.forEach((image,index)=>{


                const img =
                document.createElement("img");


                img.src = image;

                img.alt = data.title;



                img.addEventListener("click",()=>{


                    galleryMain.src = image;


                });



                thumbnails.appendChild(img);


            });



        }


    }








    /*
        FACTS
    */


    const facts =
    document.querySelectorAll(".fact-card");



    if(data.facts){


        facts.forEach((card,index)=>{


            if(data.facts[index]){


                card.querySelector("span").textContent =
                data.facts[index].label;


                card.querySelector("strong").textContent =
                data.facts[index].value;


            }


        });


    }







    /*
        AMENITIES
    */


    const amenities =
    document.querySelector(".amenity-grid");



    if(amenities && data.amenities){


        amenities.innerHTML="";


        data.amenities.forEach(item=>{


            const box =
            document.createElement("div");


            box.textContent=item;


            amenities.appendChild(box);


        });


    }








}


const slider = document.querySelector(".mobile-slider");

const counter = document.querySelector(".gallery-counter");


if(slider && counter){


slider.addEventListener("scroll",()=>{


    const index = Math.round(
        slider.scrollLeft / slider.clientWidth
    );


    counter.textContent =
    `${index + 1} / ${slider.children.length}`;


});


}

document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("popup");
    if (!popup) return;

    const popupTitle = document.getElementById("popup-title");
    const popupContent = document.getElementById("popup-content");
    const closeButton = document.querySelector(".popup-close");

    document.querySelectorAll(".info-card").forEach(card => {

        const text = card.querySelector(".card-text, .card-description");
        const button = card.querySelector(".read-more");

        if (!text || !button) return;

        // Only show fade and Read more if text is actually clipped
        if (text.scrollHeight > text.clientHeight + 2) {

            text.classList.add("has-overflow");

        } else {

            button.style.display = "none";

        }

        button.addEventListener("click", () => {

            popupTitle.textContent =
                card.querySelector("h3").textContent;

            popupContent.textContent =
                text.textContent;

            popup.style.display = "flex";

        });

    });

    closeButton.addEventListener("click", () => {

        popup.style.display = "none";

    });

    popup.addEventListener("click", (e) => {

        if (e.target === popup) {

            popup.style.display = "none";

        }

    });

});

const table = document.querySelector(".units-table");
const toggle = document.querySelector(".table-toggle");

if(toggle && table){

    toggle.addEventListener("click",()=>{

        table.classList.toggle("expanded");

        toggle.textContent = table.classList.contains("expanded")
            ? "Show Less"
            : "View All Floor Plans";

    });

}


document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("financial-overview");

    if (!container) return;

    try {

        const response = await fetch("../tools/financial-overview.html");

        if (!response.ok) {
            throw new Error("Couldn't load Financial Overview.");
        }

        container.innerHTML = await response.text();

    } catch (error) {

        console.error(error);

    }

});


document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("ai-modal-container");

    if (!container) return;

    try {

        const response = await fetch("../tools/ai-modal.html");

        if (!response.ok) {
            throw new Error("AI Modal not found");
        }

        container.innerHTML = await response.text();

        initAIModal();

    } catch(error){

        console.error("AI Modal failed loading:", error);

    }

});


function initAIModal(){

    const aiButton = document.querySelector(".ai-rating");

    const aiModal = document.getElementById("aiModal");

    const closeAiModal = document.getElementById("closeAiModal");


    if(!aiButton || !aiModal) {
        console.warn("AI modal elements missing");
        return;
    }


    aiButton.addEventListener("click",()=>{

        aiModal.classList.add("active");

    });


    if(closeAiModal){

        closeAiModal.addEventListener("click",()=>{

            aiModal.classList.remove("active");

        });

    }


    aiModal.addEventListener("click",(e)=>{

        if(e.target === aiModal){

            aiModal.classList.remove("active");

        }

    });

}


function hideMapLoading(){

    setTimeout(()=>{

        const loader = document.querySelector(".map-loading");

        if(loader){

            loader.style.opacity = "0";

            setTimeout(()=>{

                loader.style.display = "none";

            },800);

        }

    },1500);

}

document.addEventListener("DOMContentLoaded", () => {

    const architectureButton = document.querySelector(".architecture-content .read-more");

    const popup = document.getElementById("popup");

    const popupTitle = document.getElementById("popup-title");

    const popupContent = document.getElementById("popup-content");


    if(!architectureButton || !popup) return;


    architectureButton.addEventListener("click",()=>{


        popupTitle.textContent = "Architecture & Design";


        popupContent.textContent =
        `Designed with timeless architecture, refined materials, and carefully curated interiors, every residence reflects a balance of elegance, comfort, and the lifestyle of its surrounding destination.

Every detail has been thoughtfully considered to create lasting value for homeowners and investors alike.`;


        popup.style.display = "flex";


    });


});
