window.renderFacts = function(data){

    const factsGrid =
    document.getElementById("facts-grid");


    if(!factsGrid){
        return;
    }


    const shorten = (value)=>{

        if(!value) return "Coming Soon";

        return value
        .replace("Bedrooms","Beds")
        .replace("Bathrooms"," Baths")
        .replace("Condominium","Condo")
        .replace("Residences","Units");

    };


    const facts = [

        {
            label:"Type",
            value:shorten(data.type)
        },

        {
            label:"Starting",
            value:data.price || "Coming Soon"
        },

        {
            label:"Beds",
            value:shorten(data.bedrooms)
        },

        {
            label:"Delivery",
            value:data.delivery || "Coming Soon"
        },

        {
            label:"Developer",
            value:data.team?.[0]?.name || "Coming Soon"
        },

        {
            label:"Architect",
            value:data.team?.[1]?.name || "Coming Soon"
        },

        {
            label:"Floors",
            value:data.floors || "Coming Soon"
        },

        {
            label:"HOA",
            value:data.hoa || "Coming Soon"
        }

    ];


    factsGrid.innerHTML="";


    facts.forEach(fact=>{

        const card=document.createElement("div");

        card.className="fact-card";

        card.innerHTML=`

            <span>${fact.label}</span>

            <strong>${fact.value}</strong>

        `;

        factsGrid.appendChild(card);

    });

};
