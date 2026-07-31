function renderArchitecture(data){


    const title =
    document.getElementById("architecture-title");


    const text =
    document.getElementById("architecture-text");


    const gallery =
    document.getElementById("architecture-gallery");



    if(data.architecture){


        if(title){

            title.textContent =
            data.architecture.title ||
            "Architecture & Design";

        }


        if(text){

            text.textContent =
            data.architecture.text || "";

        }

    }




    if(!gallery || !data.architectureGallery){
        return;
    }



    gallery.innerHTML="";



    data.architectureGallery.forEach(item=>{


        const card =
        document.createElement("div");


        card.className =
        "architecture-card";



        if(item.image.toLowerCase().includes(".mp4")){


            card.classList.add("video-card");


            card.innerHTML=`

                <video autoplay muted loop playsinline>

                    <source src="${item.image}"
                    type="video/mp4">

                </video>


                <button class="video-toggle">
                    ▶
                </button>

            `;


        }else{


            card.innerHTML=`

                <img src="${item.image}"
                alt="${item.caption || ""}">

            `;

        }


        gallery.appendChild(card);


    });


}
