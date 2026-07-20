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
