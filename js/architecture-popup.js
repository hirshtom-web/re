document.addEventListener("DOMContentLoaded",()=>{


    const architectureReadMore =
    document.querySelector(
        ".architecture-content .read-more"
    );


    const architectureParagraph =
    document.getElementById(
        "architecture-text"
    );



    if(
        !architectureReadMore ||
        !architectureParagraph
    ){
        return;
    }



    architectureReadMore.addEventListener(
        "click",
        ()=>{


            const popup =
            document.getElementById("popup");


            const popupTitle =
            document.getElementById("popup-title");


            const popupContent =
            document.getElementById("popup-content");



            if(!popup){
                return;
            }



            popupTitle.textContent =
            "Architecture & Design";


            popupContent.textContent =
            architectureParagraph.textContent;


            popup.style.display =
            "flex";


        }
    );


});
