console.log("RESIDENCE RENDERER STARTED");


document.addEventListener("DOMContentLoaded", () => {

    const propertyID =
        new URLSearchParams(window.location.search).get("id");


    const residence =
        window.residences?.find(
            item => item.id === propertyID
        );


    if(!residence){

        console.warn("No residence data found.");

        return;

    }


    renderResidence(residence);

});





function renderResidence(data){


console.log("RENDERING:", data);

window.currentResidence = data;
    




/* =========================
   HERO
========================= */


const title =
document.getElementById("property-title");


if(title){

    title.textContent =
    data.title || "Private Residence Opportunity";

}



const address =
document.getElementById("property-address");


if(address){

    const locationText =
    [data.address, data.location]
    .filter(Boolean)
    .join(" · ");


    address.textContent =
    locationText || "Location Details Coming Soon";

}



const status =
document.getElementById("property-status");


if(status){

    status.textContent =
    data.status || "Coming Soon";

}



const update =
document.getElementById("last-update");


if(update){

    update.textContent =
    data.lastUpdated || "Last updated today";

}



const rating =
document.getElementById("ai-rating");


if(rating){

    if(data.aiRating && data.aiRating.overall){

        rating.textContent =
        `${data.aiRating.overall} AI Rating`;

    } else {

        rating.textContent =
        "AI Rating Coming Soon";

    }

}


/* =========================
   GALLERY
========================= */


const images = (data.images || []).filter(img => 
    img &&
    !img.includes("FLOORPLAN_IMAGE") &&
    !img.includes("LOGO_URL") &&
    !img.includes("placeholder")
);



const main =
document.getElementById("gallery-main");


const desktopGrid =
document.getElementById("gallery-grid");


const mobileSlider =
document.getElementById("mobile-slider");


const mobileCounter =
document.getElementById("mobile-counter");


const photoCount =
document.getElementById("photo-count");




if(images.length){



    // MAIN IMAGE

const placeholder =
document.getElementById("image-placeholder");


if(main){

    main.loading = "eager";

    main.src = images[0];

    main.onerror = () => {

        main.style.display = "none";

        const placeholder = document.createElement("div");

        placeholder.className = "image-placeholder";

        placeholder.textContent = "Images Coming Soon";

        main.parentElement.appendChild(placeholder);

    };

}


    /*
        DESKTOP GRID
    */

if(desktopGrid){

    desktopGrid.innerHTML = "";


    images.slice(1,6).forEach(image=>{

        const img = document.createElement("img");

        img.loading = "lazy";

        img.src = image;

        img.alt = `${data.title} image`;

        img.onerror = () => {
            img.remove();
        };


        img.onclick = ()=>{

            if(main){

                main.src = image;

            }

        };


        desktopGrid.appendChild(img);

    });

}




    /*
        MOBILE SLIDER
    */

    if(mobileSlider){

        mobileSlider.innerHTML = "";


        images.forEach((image,index)=>{


            const img =
            document.createElement("img");


            img.src = image;


            img.alt =
            `${data.title} image ${index + 1}`;


            mobileSlider.appendChild(img);


        });


    }





    /*
        COUNTERS
    */

    if(mobileCounter){

        mobileCounter.textContent =
        `1 / ${images.length}`;

    }



    if(photoCount){

        photoCount.textContent =
        `View all ${images.length} photos`;

    }



}








/* =========================
   MOBILE GALLERY SCROLL
========================= */


const slider =
document.querySelector(".mobile-slider");


const galleryCounter =
document.querySelector(".gallery-counter");



if(slider && galleryCounter){


    slider.addEventListener("scroll",()=>{


        const index =
        Math.round(
            slider.scrollLeft /
            slider.clientWidth
        );


        galleryCounter.textContent =
        `${index + 1} / ${slider.children.length}`;


    });


}








/* =========================
   FACTS
========================= */


const factsGrid =
document.getElementById("facts-grid");


if(factsGrid){


    const shorten = (value) => {

        if(!value) return "Coming Soon";

        return value
            .replace("Bedrooms", "Beds")
            .replace("Bathrooms", " Baths")
            .replace("Condominium", "Condo")
            .replace("Private Terraces", "Terraces")
            .replace("Residences", "Units");

    };



    const facts = [


        {
            label:"Type",
            value:shorten(data.type)
        },


        {
            label:"Starting",
            value:data.price || "Coming Soon"
        },


        {
            label:"Beds",
            value:shorten(data.bedrooms)
        },


        {
            label:"Delivery",
            value:data.delivery || "Coming Soon"
        },


        {
            label:"Developer",
            value:data.team?.[0]?.name || "Coming Soon"
        },


        {
            label:"Architect",
            value:data.team?.[1]?.name || "Coming Soon"
        },


        {
            label:"Floors",
            value:data.floors || "Coming Soon"
        },


        {
            label:"HOA",
            value:data.hoa || "Coming Soon"
        }


    ];



    factsGrid.innerHTML = "";



    facts.forEach(fact=>{


        const card =
        document.createElement("div");


        card.className =
        "fact-card";


        card.innerHTML = `

            <span>
                ${fact.label}
            </span>

            <strong title="${fact.value}">
                ${fact.value}
            </strong>

        `;


        factsGrid.appendChild(card);


    });


}



    /* =========================
   PROPERTY INTELLIGENCE
========================= */


const intelligence =
document.getElementById("property-intelligence");


if(intelligence && data.highlights){


    intelligence.innerHTML = "";


    data.highlights.forEach(item=>{


        const card =
        document.createElement("article");


        card.className = "info-card";


        card.innerHTML = `

            <h3>
                ${item.title}
            </h3>


            <p class="card-text">
                ${item.text}
            </p>


            <button class="read-more">
                Read more →
            </button>

        `;


        intelligence.appendChild(card);


    });


}

/* =========================
   AMENITIES
========================= */


const amenityGrid =
document.getElementById("amenity-grid");


if(amenityGrid && data.amenities){

    amenityGrid.innerHTML = "";

    data.amenities.forEach(item=>{

        const box =
        document.createElement("div");

        box.className = "amenity";

        box.innerHTML = `

            <span class="material-symbols-outlined">
                ${item.icon || "star"}
            </span>

            <span class="amenity-name" data-full="${item.name}">
                ${item.name}
            </span>

        `;

        amenityGrid.appendChild(box);

    });


    // Only enable tooltip when text is actually cut off
    document.querySelectorAll(".amenity-name").forEach(name=>{

        if(name.scrollWidth > name.clientWidth){
            name.classList.add("show-tooltip");
        }

    });

}
    
    
/* =========================
   NEARBY DESTINATIONS
========================= */


const nearbyGrid =
document.getElementById("nearby-grid");


console.log("NEARBY DATA:", data.nearby);


if(nearbyGrid && data.nearby){


    nearbyGrid.innerHTML = "";


    data.nearby.forEach(item=>{


        const card =
        document.createElement("div");


        card.className =
        "nearby-card";


        card.innerHTML = `

            <span class="material-symbols-outlined">
                ${item.icon || "location_on"}
            </span>


            <div>

                <strong>
                    ${item.title}
                </strong>


                <p>
                    ${item.distance} away
                </p>

            </div>

        `;


        nearbyGrid.appendChild(card);


    });


}

    
 /* =========================
    FLOOR PLAN
 ========================= */

document.addEventListener("DOMContentLoaded",()=>{


    const tbody =
    document.getElementById("residence-table-body");


    if(!tbody || !data.residences) return;


    tbody.innerHTML = "";


    data.residences.forEach(item=>{


        const row =
        document.createElement("tr");


        row.innerHTML = `

        <td>
            ${item.name}
        </td>

        <td>
            ${item.floor}
        </td>

        <td>
            ${item.view}
        </td>

        <td>
            ${item.bedrooms}
        </td>

        <td>
            ${item.bathrooms}
        </td>

        <td>
            ${item.interior}
        </td>

        <td>
            <button class="layout-btn"
            data-image="${item.layout}">
                View Plan
            </button>
        </td>

        `;


        tbody.appendChild(row);


    });



    /* =========================
       FLOOR PLAN TOGGLE
    ========================= */


    const table =
    document.querySelector(".units-table");


    const toggle =
    document.querySelector(".table-toggle");


    if(toggle && table){


        toggle.addEventListener("click",()=>{


            table.classList.toggle("expanded");


            toggle.textContent =
            table.classList.contains("expanded")
            ?
            "Show Less"
            :
            "View All Floor Plans";


        });


    }


});


/* =========================
   LOCATION MAP
========================= */


const map =
document.getElementById("property-map");


if(map && data.coordinates){


    const lat =
    data.coordinates.lat;


    const lng =
    data.coordinates.lng;


    map.src =
    `https://www.google.com/maps?q=${lat},${lng}&output=embed`;


}


} // <-- THIS closes renderResidence(data)



/* =========================
   MAP LOADING
========================= */


function hideMapLoading(){


    setTimeout(()=>{


        const loader =
        document.querySelector(".map-loading");


        if(loader){


            loader.style.opacity="0";


            setTimeout(()=>{


                loader.style.display="none";


            },800);


        }


    },1500);


}


/* =========================
   INFO CARD POPUPS
========================= */


document.addEventListener("DOMContentLoaded",()=>{


    const popup =
    document.getElementById("popup");


    if(!popup) return;



    const popupTitle =
    document.getElementById("popup-title");


    const popupContent =
    document.getElementById("popup-content");


    const closeButton =
    document.querySelector(".popup-close");



    document.querySelectorAll(".info-card")
    .forEach(card=>{


        const text =
        card.querySelector(
            ".card-text, .card-description"
        );


        const button =
        card.querySelector(".read-more");



        if(!text || !button) return;



        if(text.scrollHeight > text.clientHeight + 2){


            text.classList.add("has-overflow");


        }else{


            button.style.display="none";


        }




        button.addEventListener("click",()=>{


            popupTitle.textContent =
            card.querySelector("h3")?.textContent || "";



            popupContent.textContent =
            text.textContent;



            popup.style.display="flex";


        });


    });





    if(closeButton){

        closeButton.addEventListener("click",()=>{

            popup.style.display="none";

        });

    }



    popup.addEventListener("click",(e)=>{


        if(e.target === popup){

            popup.style.display="none";

        }


    });



});






/* =========================
   FINANCIAL OVERVIEW LOAD
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









/* =========================
   AI MODAL LOAD
========================= */


document.addEventListener("DOMContentLoaded",async()=>{


    const container =
    document.getElementById(
        "ai-modal-container"
    );


    if(!container) return;



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


});









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
   ARCHITECTURE POPUP
========================= */


document.addEventListener("DOMContentLoaded",()=>{


    const button =
    document.querySelector(
        ".architecture-content .read-more"
    );


    const popup =
    document.getElementById("popup");


    if(!button || !popup) return;



    button.addEventListener("click",()=>{


        document.getElementById(
            "popup-title"
        ).textContent =
        "Architecture & Design";



        document.getElementById(
            "popup-content"
        ).textContent =
        `
Designed with timeless architecture, refined materials, and carefully curated interiors.

Every detail has been thoughtfully considered to create lasting value for homeowners and investors alike.
        `;



        popup.style.display="flex";


    });


});


/* =========================
   FAQ ACCORDION
========================= */


document.addEventListener("DOMContentLoaded",()=>{


    document.querySelectorAll(".faq-question")
    .forEach(button=>{


        button.addEventListener("click",()=>{


            const item =
            button.parentElement;



            document.querySelectorAll(".faq-item")
            .forEach(other=>{


                if(other !== item){

                    other.classList.remove("active");

                }


            });



            item.classList.toggle("active");


        });


    });


});








/* =========================
   FAQ SHOW MORE
========================= */


document.addEventListener("DOMContentLoaded",()=>{


    const faqToggle =
    document.querySelector(".faq-toggle");


    const faqWrapper =
    document.querySelector(".faq-wrapper");



    if(!faqToggle || !faqWrapper) return;



    faqToggle.addEventListener("click",()=>{


        faqWrapper.classList.toggle(
            "expanded"
        );



        faqToggle.textContent =
        faqWrapper.classList.contains("expanded")
        ?
        "Show Less"
        :
        "Show More";


    });


});








/* =========================
   VIRTUAL SHOWING
========================= */


document.addEventListener("DOMContentLoaded",()=>{


    let selectedDate = false;

    let selectedTime = false;



    const button =
    document.querySelector(
        ".schedule-button"
    );



    if(!button) return;



    document.querySelectorAll(".date-card")
    .forEach(card=>{


        card.addEventListener("click",()=>{


            document.querySelectorAll(".date-card")
            .forEach(c=>{


                c.classList.remove("active");


            });



            card.classList.add("active");



            selectedDate = true;



            checkReady();


        });


    });





    document.querySelectorAll(
        ".time-slots button"
    )
    .forEach(time=>{


        time.addEventListener("click",()=>{


            document.querySelectorAll(
                ".time-slots button"
            )
            .forEach(t=>{


                t.classList.remove(
                    "selected"
                );


            });



            time.classList.add(
                "selected"
            );



            selectedTime = true;



            checkReady();


        });


    });






    function checkReady(){


        if(selectedDate && selectedTime){


            button.classList.add(
                "ready"
            );


            button.disabled = false;


            button.innerHTML =
            "Request Virtual Showing →";


        }


    }


});









/* =========================
   MEDIA LIBRARY
========================= */


function openMediaLibrary(){



    const mediaLibrary =
    document.getElementById(
        "mediaLibrary"
    );


    const mediaContent =
    document.getElementById(
        "mediaContent"
    );



    if(!mediaLibrary || !mediaContent){

        return;

    }




    const galleryImages =
    document.querySelectorAll(
        ".gallery-feature img, .gallery-grid img"
    );



    mediaContent.innerHTML = "";




    galleryImages.forEach(img=>{


        const newImg =
        document.createElement("img");



        newImg.src =
        img.src;



        newImg.alt =
        img.alt;



        mediaContent.appendChild(
            newImg
        );


    });





    mediaLibrary.classList.add(
        "active"
    );



}







function closeMediaLibrary(){


    const mediaLibrary =
    document.getElementById(
        "mediaLibrary"
    );



    if(mediaLibrary){


        mediaLibrary.classList.remove(
            "active"
        );


    }


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
