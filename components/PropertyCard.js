function createPropertyCard(property){

return `

<div class="property-card" data-id="${property.id}">

    <div class="property-image">

        <img 
        src="${property.thumbnail}" 
        alt="${property.title}"
        >

        <span class="property-status">
        ${property.status}
        </span>

    </div>


    <div class="property-content">

        <div class="property-location">
        ${property.location}
        </div>


        <h3>
        ${property.title}
        </h3>


        <div class="property-details">

            <span>
            ${property.type}
            </span>

            <span>
            ${property.price}
            </span>

        </div>


        <div class="property-meta">

            <span>
            ${property.beds}
            </span>

            <span>
            Delivery ${property.delivery}
            </span>

        </div>


        <button onclick="openProperty('${property.id}')">
            View Residence
        </button>

    </div>

</div>

`;

}
