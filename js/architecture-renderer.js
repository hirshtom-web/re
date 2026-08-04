function renderArchitecture(data){


    const architectureTitle =
    document.getElementById("architecture-title");


    const architectureText =
    document.getElementById("architecture-text");


    const architectureGallery =
    document.getElementById("architecture-gallery");



    if(data.architecture){


        if(architectureTitle){

            architectureTitle.textContent =
            data.architecture.title ||
            "Architecture & Design";

        }


        if(architectureText){

            architectureText.textContent =
            data.architecture.text || "";

        }

    }



    if(!architectureGallery || !data.architectureGallery){
        return;
    }



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
