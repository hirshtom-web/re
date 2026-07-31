// ======================================
// PROPERTY GALLERY
// ======================================

function initGallery(property){

    if(!property){
        console.warn("No property for gallery");
        return;
    }


    const images =
        (property.images || [])
        .filter(Boolean);


    const mainImage =
        document.getElementById(
            "property-main-image"
        );


    const galleryGrid =
        document.getElementById(
            "gallery-grid"
        );


    if(!images.length){

        console.warn(
            "No images found:",
            property.id
        );

        return;

    }



    if(mainImage){

        mainImage.src = images[0];


        mainImage.onerror = ()=>{

            console.error(
                "Failed loading:",
                mainImage.src
            );

        };

    }



    if(galleryGrid){

        galleryGrid.innerHTML = "";


        images.slice(1).forEach((src,index)=>{


            const img =
            document.createElement("img");


            img.src = src;


            img.alt =
            `${property.title} photo ${index + 2}`;



            img.addEventListener(
                "click",
                ()=>{

                    if(mainImage){

                        mainImage.src = src;

                    }

                }
            );


            galleryGrid.appendChild(img);


        });

    }

}
