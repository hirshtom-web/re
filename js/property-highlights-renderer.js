/* =========================
       PROPERTY HIGHLIGHTS
    ========================= */

    const title =
        document.getElementById("property-title");

    if(title){

        title.textContent =
            data.title || "Private Residence Opportunity";

    }


    const address =
        document.getElementById("property-address");

    if(address){

        const locationText =
            [data.address, data.location]
            .filter(Boolean)
            .join(" · ");

        address.textContent =
            locationText || "Location Details Coming Soon";

    }


    const status =
        document.getElementById("property-status");

    if(status){

        status.textContent =
            data.status || "Coming Soon";

    }


    const update =
        document.getElementById("last-update");

    if(update){

        update.textContent =
            data.lastUpdated || "Last updated today";

    }


    const rating =
        document.getElementById("ai-rating");

    if(rating){

        if(data.aiRating && data.aiRating.overall){

            rating.textContent =
                `${data.aiRating.overall} AI Rating`;

        }else{

            rating.textContent =
                "AI Rating Coming Soon";

        }

    }
