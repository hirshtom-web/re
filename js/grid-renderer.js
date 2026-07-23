/* ==========================================
   PROPERTY GRID RENDERER
========================================== */


const propertiesGrid =
document.getElementById("properties-grid");


if(propertiesGrid && window.residences){


    window.residences.forEach(property => {


        propertiesGrid.innerHTML += `


        <article

        class="property-card"

        data-property-id="${property.id}"

        onclick="openModal('residence.html','${property.id}')">


            <div class="property-card-image">


                <img

                src="${property.thumbnail}"

                alt="${property.title}">


                <span class="property-badge">

                ${property.status}

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

                ${property.price}

                </strong>


            </div>


        </article>


        `;


    });


}else{


    console.error(
        "Property grid failed: residences data missing"
    );


}
