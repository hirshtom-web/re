// ======================================
// MEDIA LIBRARY CONTROLLER
// ======================================

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


        viewer.src =
            planUrl;


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

// ======================================
// CLOSE MEDIA LIBRARY
// ======================================

function closeMediaLibrary(){

    const mediaLibrary =
        document.getElementById("mediaLibrary");

    const mediaContent =
        document.getElementById("mediaContent");


    if(mediaLibrary){

        mediaLibrary.classList.remove(
            "active"
        );

    }


    if(mediaContent){

        mediaContent.innerHTML = "";

    }

}

// CLOSE WITH ESC KEY

document.addEventListener(
"keydown",
(e)=>{

    if(e.key === "Escape"){

        closeMediaLibrary();

    }

});

document.addEventListener(
"click",
(e)=>{

    const mediaLibrary =
        document.getElementById("mediaLibrary");


    if(
        e.target === mediaLibrary
    ){

        closeMediaLibrary();

    }

});


// ======================================
// EXPOSE MEDIA FUNCTIONS
// ======================================

window.openMediaLibrary =
    openMediaLibrary;


window.closeMediaLibrary =
    closeMediaLibrary;
