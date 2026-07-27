function filterProperties(){


    const searchInput =
    document.getElementById("property-search");



    let search =
    searchInput
    ? searchInput.value.toLowerCase()
    : "";



    let filtered =
    window.properties.filter(property=>{



        const title =
        (property.title || "")
        .toLowerCase();



        const loc =
        (property.location || "")
        .toLowerCase();



        const neighborhood =
        (property.neighborhood || "")
        .toLowerCase();




        const textMatch =

        title.includes(search)

        ||

        loc.includes(search)

        ||

        neighborhood.includes(search);





        const locationMatch =

        !propertyFilters.location

        ||

        loc.includes(
            propertyFilters.location.toLowerCase()
        );





        const propertyTypeMatch =

        !propertyFilters.propertyType

        ||

        property.type === propertyFilters.propertyType;





        const completionMatch =

        !propertyFilters.completion

        ||

        Number(property.completionYear) <=
        Number(propertyFilters.completion);





        const priceMatch =


        (property.priceValue || 0)
        >=
        propertyFilters.minPrice


        &&


        (property.priceValue || 0)
        <=
        propertyFilters.maxPrice;





        return (

            textMatch

            &&

            locationMatch

            &&

            propertyTypeMatch

            &&

            completionMatch

            &&

            priceMatch

        );


    });







    // SORT


    switch(propertyFilters.sort){


        case "price-low":


            filtered.sort((a,b)=>
                (a.priceValue || 0)
                -
                (b.priceValue || 0)
            );


        break;





        case "price-high":


            filtered.sort((a,b)=>
                (b.priceValue || 0)
                -
                (a.priceValue || 0)
            );


        break;





        case "name":


            filtered.sort((a,b)=>
                a.title.localeCompare(b.title)
            );


        break;





        case "location":


            filtered.sort((a,b)=>
                a.location.localeCompare(b.location)
            );


        break;


    }






    renderPropertiesGrid(filtered);





    if(window.updateMapMarkers){

        updateMapMarkers(filtered);

    }



}
