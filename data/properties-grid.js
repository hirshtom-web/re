/* ==========================================
   PROPERTIES GRID RENDERER
========================================== */


function renderPropertiesGrid(){


    const propertiesGrid = document.getElementById("properties-grid");


    if(!propertiesGrid){

        console.error(
            "Properties grid element missing"
        );

        return;

    }


    if(!window.residences){

        console.error(
            "Residences data missing"
        );

        return;

    }



    propertiesGrid.innerHTML = "";



    window.residences.forEach(property => {



        propertiesGrid.innerHTML += `


        <article

        class="property-card"

        data-property-id="${property.id}"

        onclick="openModal('residence.html','${property.id}')">


            <div class="property-card-image">


                <img

                src="${property.images?.[0] || property.thumbnail}"

                alt="${property.title}">


                <span class="property-badge">

                    ${property.status || "Available"}

                </span>



                <button

                class="property-favorite"

                onclick="event.stopPropagation();">

                    ♡

                </button>


            </div>



            <div class="property-card-info">


                <h3>

                    ${property.title}

                </h3>



                <p>

                    ${property.location}

                </p>



                <strong>

                    ${property.price || "Price Upon Request"}

                </strong>


            </div>


        </article>


        `;


    });


}
