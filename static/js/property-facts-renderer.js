window.renderFacts = function(data){

    const factsGrid =
        document.getElementById("facts-grid");


    if(!factsGrid){
        return;
    }


    /*
       Supports both:

       MLS:
       bedrooms: 2
       propertyType: "Condominium"

       Development:
       bedrooms: "2-5 Bedrooms"
       type: "Luxury Condominium"
    */

    const clean = (value)=>{

        if(value === null || value === undefined || value === ""){
            return "Coming Soon";
        }


        return String(value)
            .replace("Bedrooms","Beds")
            .replace("Bathrooms"," Baths")
            .replace("Condominium","Condo")
            .replace("Residences","Units");

    };



    const type =
        data.type ||
        data.propertyType ||
        "Coming Soon";



    const developer =
        data.developer ||
        data.team?.[0]?.name ||
        "Coming Soon";



    const architect =
        data.architect ||
        data.team?.[1]?.name ||
        "Coming Soon";



    const facts = [


        {
            label:"Type",
            value:clean(type)
        },


        {
            label:"Price",
            value:data.price || "Coming Soon"
        },


        {
            label:"Beds",
            value:clean(data.bedrooms)
        },


        {
            label:"Baths",
            value:clean(
                data.bathrooms ||
                data.bathroomsTotal
            )
        },


        {
            label:"Delivery",
            value:data.delivery || "Coming Soon"
        },


        {
            label:"Developer",
            value:developer
        },


        {
            label:"Architect",
            value:architect
        },


        {
            label:"Floors",
            value:data.floors || "Coming Soon"
        },


        {
            label:"Units",
            value:
                data.units ||
                data.totalUnits ||
                "Coming Soon"
        },


        {
            label:"HOA",
            value:data.hoa || "Coming Soon"
        }

    ];



    factsGrid.innerHTML = "";



    facts.forEach(fact=>{


        const card =
            document.createElement("div");


        card.className =
            "fact-card";



        card.innerHTML = `

            <span>${fact.label}</span>

            <strong>${fact.value}</strong>

        `;



        factsGrid.appendChild(card);


    });


};
