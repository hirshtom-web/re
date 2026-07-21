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


    const buttons = document.querySelectorAll("button");

    buttons.forEach(button=>{

        if(data.cta){

            button.textContent = data.cta;

        }

    });







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

toggle.addEventListener("click",()=>{

    table.classList.toggle("expanded");

    toggle.textContent = table.classList.contains("expanded")
        ? "Show Less"
        : "View All Floor Plans";

});


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


const aiButton = document.querySelector(".ai-rating");

const aiModal = document.getElementById("aiModal");

const closeAiModal = document.getElementById("closeAiModal");


if(aiButton){

    aiButton.addEventListener("click",()=>{

        aiModal.classList.add("active");

    });

}


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
