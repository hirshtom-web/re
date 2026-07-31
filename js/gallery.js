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


    const mobileSlider =
        document.getElementById(
            "mobile-slider"
        );


    const mobileCounter =
        document.getElementById(
            "mobile-counter"
        );



    if(!images.length){

        console.warn(
            "No images found:",
            property.id
        );

        return;

    }



    // DESKTOP MAIN IMAGE

    if(mainImage){

        mainImage.src =
            images[0];

    }



    // DESKTOP THUMBNAILS

    if(galleryGrid){

        galleryGrid.innerHTML = "";


        images.slice(1).forEach((src,index)=>{


            const img =
                document.createElement("img");


            img.src =
                src;


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



    // MOBILE GALLERY

    if(mobileSlider){

        mobileSlider.innerHTML = "";


        images.forEach((src,index)=>{


            const img =
                document.createElement("img");


            img.src =
                src;


            img.alt =
                `${property.title} photo ${index + 1}`;


            mobileSlider.appendChild(img);


        });

    }



    if(mobileCounter){

        mobileCounter.textContent =
            `1 / ${images.length}`;

    }



    // MOBILE SWIPE

    let startX = 0;


    if(mobileSlider){

        mobileSlider.addEventListener(
            "touchstart",
            e=>{

                startX =
                    e.touches[0].clientX;

            }
        );


        mobileSlider.addEventListener(
            "touchend",
            e=>{

                const endX =
                    e.changedTouches[0].clientX;


                if(startX - endX > 50){

                    mobileSlider.scrollLeft +=
                        mobileSlider.clientWidth;

                }


                if(endX - startX > 50){

                    mobileSlider.scrollLeft -=
                        mobileSlider.clientWidth;

                }

            }
        );

    }

}
