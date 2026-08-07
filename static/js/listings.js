fetch("/listings")
.then(response => response.json())
.then(data => {

    const listings = data.value || [];

    console.log("LIVE MLS:", listings);


window.properties = listings.map((item,index)=>({

    id: item.ListingKey || item.ListingId || index,

    title:
        item.UnparsedAddress || "Property",


        price:
            item.ListPrice
            ? "$" + Number(item.ListPrice).toLocaleString()
            : "Request Pricing",


        priceValue:
            Number(item.ListPrice) || 0,


        location:
            item.City || "",


        neighborhood:
            item.SubdivisionName || "",


        propertyType:
            item.PropertyType || "",


        type:
            item.PropertyType || "",


        status:
            item.StandardStatus || "Available",


        thumbnail:
            item.Media?.[0]?.MediaURL || "",


        images:
            item.Media
            ? item.Media.map(x=>x.MediaURL)
            : [],


        bedrooms:
            item.BedroomsTotal || "",


        bathrooms:
            item.BathroomsTotalInteger || "",


        sqft:
            item.LivingArea || ""

    }));


console.log("NORMALIZED PROPERTIES:", window.properties);


if(typeof renderPropertiesGrid === "function"){

    renderPropertiesGrid(window.properties);

}

restorePropertyFromURL();


/* RESTORE PROPERTY FROM URL */


function restorePropertyFromURL(){

    const propertyParam =
        new URLSearchParams(
            window.location.search
        ).get("property");


    if(!propertyParam){
        return;
    }


    const id =
        propertyParam.split("/")[1];


    if(!id){
        return;
    }


    console.log(
        "URL PROPERTY FOUND:",
        id
    );


    const timer =
        setInterval(
            function(){

                const modal =
                    document.getElementById("dealModal");


                const frame =
                    document.getElementById("dealFrame");


                if(
                    window.properties &&
                    window.properties.length &&
                    typeof window.openModal === "function" &&
                    modal &&
                    frame
                ){

                    clearInterval(timer);


                    console.log(
                        "RESTORING PROPERTY:",
                        id
                    );


                    window.openModal(
                        "/residence.html",
                        id
                    );

                }

            },
            100
        );

}


})
.catch(err=>{
    console.error("MLS ERROR",err);
});

