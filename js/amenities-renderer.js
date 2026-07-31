function renderAmenities(data){


    const amenityGrid =
    document.getElementById("amenity-grid");


    if(!amenityGrid || !data.amenities){

        return;

    }


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



    // Enable tooltip only when text is actually cut off

    document
    .querySelectorAll(".amenity-name")
    .forEach(name=>{


        if(name.scrollWidth > name.clientWidth){

            name.classList.add(
                "show-tooltip"
            );

        }


    });


}
