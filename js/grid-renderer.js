propertiesGrid.innerHTML += `
<article
    class="property-card"
    data-property-id="${property.id}"
    onclick="openModal('residence.html','${property.id}')">

    <div class="property-card-image">

        <img
            src="${property.images?.[0] || 'images/placeholder.jpg'}"
            alt="${property.title}">

        <span class="property-badge">
            ${property.status}
        </span>

        <span class="property-tag">
            ${property.type || "Luxury"}
        </span>

        <button
            class="property-favorite"
            onclick="event.stopPropagation();">
            ♡
        </button>

    </div>

    <div class="property-card-info">

        <div class="property-card-header">

            <h3>${property.title}</h3>

            <strong>${property.price}</strong>

        </div>

        <p>${property.location}</p>

    </div>

</article>
`;
