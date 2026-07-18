/* ==========================================
   LISTINGS RENDERER
========================================== */


const listingGrid =
document.getElementById("deal-grid");


listingGrid.innerHTML = "";


Object.keys(window.properties).forEach(id => {


    const property =
    window.properties[id];


    listingGrid.innerHTML += `


    <a href="#"
       class="deal-card"
       onclick="openDeal('${id}'); return false;">


        <div class="deal-image">

            <img 
            src="${property.hero.image}"
            alt="${property.hero.title}">

        </div>



        <div class="deal-body">


            <div class="status">

                AVAILABLE • 
                ${property.property.propertyType}

            </div>



            <h2>

                ${property.hero.title}

            </h2>



            <p class="location">

                ${property.property.location}

            </p>



            <div class="metrics">


                <div>

                    <span>
                    Price
                    </span>

                    <strong>

                    $${property.financial.purchasePrice.toLocaleString()}

                    </strong>

                </div>



                <div>

                    <span>
                    NOI
                    </span>

                    <strong>

                    $${property.financial.noi.toLocaleString()}

                    </strong>

                </div>



                <div>

                    <span>
                    CAP
                    </span>

                    <strong>

                    ${property.financial.capRate}%

                    </strong>

                </div>


            </div>



            <div class="view">

                VIEW OFFERING

            </div>


        </div>


    </a>


    `;


});



/* ==========================================
   OPEN PROPERTY
========================================== */


function openDeal(id){

    console.log("CLICKED:", id);


    const property =
    window.properties[id];


    console.log("PROPERTY:", property);



    if(property){


        // All properties use the same template

        openModal(
            "property.html",
            id
        );


    } else {


        console.log(
            "Missing property:",
            id
        );


    }

}
