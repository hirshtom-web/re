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


