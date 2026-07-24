console.log("RESIDENCE RENDERER STARTED");

let currentResidence = null;


window.hideMapLoading = function(){

    setTimeout(()=>{

        const loader =
        document.querySelector(".map-loading");


        if(loader){

            loader.style.opacity = "0";


            setTimeout(()=>{

                loader.style.display = "none";

            },800);

        }

    },1500);

};


document.addEventListener("DOMContentLoaded", () => {

    const propertyID =
        new URLSearchParams(window.location.search).get("id");


    currentResidence =
window.residences?.find(
    item => item.id === propertyID
);


    if(!currentResidence){

    console.warn("No residence data found.");

    return;

}


renderResidence(currentResidence);

});





function renderResidence(data){


    console.log("RENDERING:", data);

    window.currentResidence = data;


    const tbody =
    document.getElementById("residence-table-body");


    if(tbody && data.residences){

        tbody.innerHTML = "";


        data.residences.forEach(item=>{


            const row =
            document.createElement("tr");


            row.innerHTML = `

                <td>${item.name}</td>

                <td>${item.bedrooms}</td>

                <td>${item.bathrooms}</td>

                <td>${item.interior}</td>

                <td class="plan-cell">

    <button 
        class="plan-link"
        data-plan="${item.layout}"
        data-title="${item.name} Floor Plan">

        <img
            src="${item.preview || item.layout}"
            class="plan-thumb"
            alt="${item.name} Floor Plan">

    </button>

</td>

            `;


            tbody.appendChild(row);


        });

    }




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
            label:"itect",
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
   CONSTRUCTION TIMELINE
========================= */

const timeline =
document.getElementById("construction-timeline");

if(timeline && data.constructionTimeline){

    timeline.innerHTML = "";

    data.constructionTimeline.forEach(step=>{

        const card =
        document.createElement("div");

        card.className =
        `timeline-step ${step.state || ""}`;

        card.innerHTML = `

            <span class="timeline-dot"></span>

            <div>

                <small>${step.year}</small>

                <strong>${step.title}</strong>

                ${step.status ? `<p>${step.status}</p>` : ""}

            </div>

        `;

        timeline.appendChild(card);

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
   NEIGHBORHOOD LIFESTYLE
========================= */


const lifestyleGrid =
document.getElementById("lifestyle-grid");


const lifestyleIntro =
document.getElementById("lifestyle-intro");


if(lifestyleIntro && data.lifestyleIntro){

    lifestyleIntro.textContent =
    data.lifestyleIntro;

}



if(lifestyleGrid && data.lifestyleHighlights){


    lifestyleGrid.innerHTML = "";


    data.lifestyleHighlights.forEach(item=>{


        const card =
        document.createElement("div");


        card.className =
        "lifestyle-card";


        card.innerHTML = `

            <span class="material-symbols-outlined">
                ${item.icon || "location_on"}
            </span>


            <h3>
                ${item.title}
            </h3>


            <p>
                ${item.text}
            </p>

        `;


        lifestyleGrid.appendChild(card);


    });

}

   /* =========================
   LIFESTYLE EXPERIENCES
========================= */

const lifestyleSlider =
document.getElementById("lifestyle-slider");


if(lifestyleSlider && data.lifestyleExperiences){

    lifestyleSlider.innerHTML = "";


    data.lifestyleExperiences.forEach(item=>{


        const slide =
        document.createElement("div");


        slide.className =
        "lifestyle-slide";


        slide.innerHTML = `

            <img 
                src="${item.image}"
                alt="${item.title}"
            >

            <div class="slide-overlay">

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.text}
                </p>

            </div>

        `;


        lifestyleSlider.appendChild(slide);


    });

}
    

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



    
/* =========================
   ARCHITECTURE & DESIGN
========================= */

const architectureTitle =
document.getElementById("architecture-title");

const architectureText =
document.getElementById("architecture-text");

const architectureGallery =
document.getElementById("architecture-gallery");


if(data.architecture){

    if(architectureTitle){

        architectureTitle.textContent =
        data.architecture.title || "Architecture & Design";

    }


    if(architectureText){

        architectureText.textContent =
        data.architecture.text || "";

    }

}



if(architectureGallery && data.architectureGallery){

    architectureGallery.innerHTML = "";


    data.architectureGallery.forEach(item=>{


        const card =
        document.createElement("div");


        card.className =
        "architecture-card";



        if(item.image.toLowerCase().includes(".mp4")){


            card.classList.add("video-card");


            card.innerHTML = `

                <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="auto"
                >

                    <source 
                    src="${item.image}" 
                    type="video/mp4">

                </video>


                <button class="video-toggle">
                    ▶
                </button>


                <p>
                    ${item.caption || ""}
                </p>

            `;


        }else{


            card.innerHTML = `

                <img
                src="${item.image}"
                alt="${item.caption || ""}">



            `;

        }


        architectureGallery.appendChild(card);


    });



    architectureGallery
    .querySelectorAll(".video-toggle")
    .forEach(button=>{


        button.addEventListener("click",()=>{


            const video =
            button
            .closest(".video-card")
            .querySelector("video");



            if(video.paused){


                video.play();

                button.textContent="Ⅱ";


            }else{


                video.pause();

                button.textContent="▶";


            }


        });


    });

}



if(data.designTeam){


    const architect =
    document.getElementById("team-architect");


    const interiors =
    document.getElementById("team-interiors");


    const landscape =
    document.getElementById("team-landscape");



    if(architect){

        architect.textContent =
        data.designTeam.architect || "Coming Soon";

    }


    if(interiors){

        interiors.textContent =
        data.designTeam.interiors || "Coming Soon";

    }


    if(landscape){

        landscape.textContent =
        data.designTeam.landscape || "Coming Soon";

    }
    
}
    
    
    const architectureReadMore =
document.querySelector(".architecture-content .read-more");


const architectureParagraph =
document.getElementById("architecture-text");


if(architectureReadMore && architectureParagraph){

    architectureReadMore.addEventListener("click",()=>{

        architectureParagraph.classList.toggle("expanded");


        architectureReadMore.textContent =
        architectureParagraph.classList.contains("expanded")
        ?
        "Read less ←"
        :
        "Read more →";

    });


}


/* =========================
   MORTGAGE CALCULATOR
========================= */

if(data.mortgage){

    const propertyData =
    document.querySelector(".property-data");


    if(propertyData){

        propertyData.dataset.price =
        data.mortgage.price;

        propertyData.dataset.downPayment =
        data.mortgage.downPayment;

        propertyData.dataset.taxRate =
        data.mortgage.taxRate;

        propertyData.dataset.insuranceRate =
        data.mortgage.insuranceRate;

        propertyData.dataset.hoaSqft =
        data.mortgage.hoaSqft;

        propertyData.dataset.unitSize =
        data.mortgage.size;

        propertyData.dataset.interestRate =
        data.mortgage.interestRate;

    }



    const homePrice =
    document.getElementById("home-price");


    const downPayment =
    document.getElementById("down-payment");


    const interestRate =
    document.getElementById("interest-rate");


    const loanYears =
    document.getElementById("loan-years");



    if(homePrice){

        homePrice.value =
        data.mortgage.price;

    }



    if(downPayment){

        downPayment.value =
        data.mortgage.downPayment;

    }



    if(interestRate){

        interestRate.value =
        data.mortgage.interestRate;

    }



    if(loanYears){

        loanYears.value =
        data.mortgage.loanYears || 30;

    }



    // refresh calculator

    if(typeof calculate === "function"){

        calculate();

    }

}
    
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
   FAQ RENDER
========================= */

function renderFAQ(){

    const faqList =
    document.getElementById(
        "faq-list"
    );


    console.log(
        "FAQ LIST:",
        faqList
    );


    console.log(
    "RESIDENCE DATA:",
    currentResidence
);


if(!faqList || !currentResidence?.faq){

    console.log(
        "FAQ DATA NOT FOUND"
    );

    return;

}


currentResidence.faq.forEach(item=>{


        const faq =
        document.createElement(
            "div"
        );


        faq.className =
        "faq-item";


        faq.innerHTML = `

            <button class="faq-question">

                ${item.question}

                <span>+</span>

            </button>


            <div class="faq-answer">

                <p>${item.answer}</p>

            </div>

        `;


        faqList.appendChild(faq);


    });


}



/* =========================
   FAQ ACCORDION
========================= */


function initFAQAccordion(){


    document
    .querySelectorAll(".faq-question")
    .forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const item =
                button.parentElement;



                document
                .querySelectorAll(".faq-item")
                .forEach(other=>{


                    if(other !== item){

                        other.classList.remove(
                            "active"
                        );

                    }


                });



                item.classList.toggle(
                    "active"
                );


            }
        );


    });


}





/* =========================
   FAQ SHOW MORE
========================= */


function initFAQToggle(){


    const faqToggle =
    document.querySelector(
        ".faq-toggle"
    );


    const faqWrapper =
    document.querySelector(
        ".faq-wrapper"
    );



    if(!faqToggle || !faqWrapper){

        return;

    }



    faqToggle.addEventListener(
        "click",
        ()=>{


            faqWrapper.classList.toggle(
                "expanded"
            );



            faqToggle.textContent =
            faqWrapper.classList.contains(
                "expanded"
            )
            ?
            "Show Less"
            :
            "Show More";


        }
    );


}



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

