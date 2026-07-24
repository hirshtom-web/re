function createPropertyCard(property){

return `

<div class="property-card" data-id="${property.id}">

    <div class="property-image">

        <img 
        src="${property.thumbnail || 'images/property-placeholder.jpg'}" 
        alt="${property.title}"
        >

        <span class="property-status">
        ${property.status || "Coming Soon"}
        </span>

    </div>


    <div class="property-content">

        <div class="property-location">
        ${property.location || ""}
        </div>


        <h3>
        ${property.title}
        </h3>


        <div class="property-details">

            <span>
            ${property.type || "Luxury Residence"}
            </span>

            <span>
            ${property.price || "Price Upon Request"}
            </span>

        </div>


        <div class="property-meta">

            <span>
            ${property.beds || "Bedrooms TBD"}
            </span>

            <span>
            Delivery ${property.delivery || "TBD"}
            </span>

        </div>


        <button onclick="openProperty('${property.id}')">
            View Residence
        </button>

    </div>

</div>

`;

}
