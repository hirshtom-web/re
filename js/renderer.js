/* ==========================================
   PROPERTY IDENTIFIER
========================================== */


const params = new URLSearchParams(
    window.location.search
);


const propertyID =
    params.get("id") ||
    Object.keys(window.properties)[0];


window.currentProperty =
    window.properties[propertyID];


console.log("PROPERTY ID:", propertyID);
console.log("CURRENT PROPERTY:", window.currentProperty);



const property =
    window.currentProperty;



if(!property){

    console.error(
        "Property not found:",
        propertyID
    );

    throw new Error(
        "Invalid property ID"
    );

}


/* ==========================================
   HERO
========================================== */


document.getElementById("property-title").textContent =
property.hero.title;


document.getElementById("property-subtitle").textContent =
property.hero.subtitle;


document.getElementById("property-address").innerHTML =
property.hero.address;



/* IMAGE */

document.getElementById("property-image").src =
property.hero.image;


document.getElementById("image-credit").textContent =
property.hero.imageCaption;



/* ==========================================
   SNAPSHOT
========================================== */


document.getElementById("purchase-price").textContent =
"$" +
property.financial.purchasePrice.toLocaleString();


document.getElementById("annual-noi").textContent =
"$" +
property.financial.noi.toLocaleString();


document.getElementById("cap-rate").textContent =
property.financial.capRate + "%";


document.getElementById("lease-term").textContent =
property.leaseDetails.remainingTerm;


document.getElementById("lease-structure").textContent =
property.leaseDetails.structure;



/* ==========================================
   ASSET OVERVIEW
========================================== */


document.getElementById("tenant").textContent =
property.tenantInfo.name;


document.getElementById("building-size").textContent =
property.property.buildingSize;


document.getElementById("lot-size").textContent =
property.property.lotSize;


document.getElementById("year-built").textContent =
property.property.yearBuilt;


document.getElementById("property-type").textContent =
property.property.propertyType;


document.getElementById("location").textContent =
property.property.location;



/* ==========================================
   HIGHLIGHTS
========================================== */


const highlights =
document.getElementById("highlights");


highlights.innerHTML = "";


property.highlights.forEach((item,index)=>{


    highlights.innerHTML += `

    <div class="highlight">


        <span>
        ${String(index+1).padStart(2,"0")}
        </span>


        <div>

            <h3>
            ${item.title}
            </h3>


            <p>
            ${item.text}
            </p>

        </div>


    </div>

    `;


});



/* ==========================================
   SUMMARY
========================================== */


const summary =
document.getElementById("summary");


summary.innerHTML = "";


property.summary.forEach(text=>{


    summary.innerHTML += `

    <p>
    ${text}
    </p>

    `;


});



/* ==========================================
   FINANCIAL OVERVIEW
========================================== */


const financial =
document.getElementById("financial-overview");


financial.innerHTML = "";


property.financialOverview.forEach(item=>{


    financial.innerHTML += `

    <div>

        <span>
        ${item.label}
        </span>


        <strong>
        ${item.value}
        </strong>


    </div>

    `;


});


console.log("SCORE DEBUG:", property.score);
console.log("SCORE ELEMENT:", document.getElementById("scoreValue"));

/* ==========================================
   SCORECARD
========================================== */


document.getElementById("scoreValue").textContent =
property.score.value;


document.getElementById("scoreLabel").textContent =
property.score.label;


document.getElementById("score-summary").textContent =
property.score.summary;



const scoreGrid =
document.getElementById("score-grid");


scoreGrid.innerHTML = "";


property.score.cards.forEach(card=>{


    scoreGrid.innerHTML += `

    <div class="score-card">


        <label>
        ${card.label}
        </label>


        <strong>
        ${card.value}
        </strong>


        <small>
        ${card.description}
        </small>


    </div>

    `;


});



/* ==========================================
   PROPERTY FACTS
========================================== */


const facts =
document.getElementById("property-facts");


facts.innerHTML = "";


property.propertyFacts.forEach(item=>{


    facts.innerHTML += `

    <div>

        <span>
        ${item.label}
        </span>


        <strong>
        ${item.value}
        </strong>


    </div>

    `;


});



/* ==========================================
   LOCATION
========================================== */


document.getElementById("location-title").textContent =
property.locationOverview;



const locationHighlights =
document.getElementById("location-highlights");


locationHighlights.innerHTML = "";


property.locationHighlights.forEach(item=>{


    locationHighlights.innerHTML +=
    `<li>${item}</li>`;


});



/* GOOGLE MAP */

document.getElementById("property-map").src =

"https://www.google.com/maps?q=" +

property.coordinates.latitude +

"," +

property.coordinates.longitude +

"&output=embed";



/* ==========================================
   RISK
========================================== */


const risk =
document.getElementById("risk-grid");


risk.innerHTML = "";


property.riskStrategy.forEach(item=>{


    risk.innerHTML += `

    <div>


        <h3>
        ${item.title}
        </h3>


        <p>
        ${item.text}
        </p>


    </div>

    `;


});



/* ==========================================
   MARKET
========================================== */


document.getElementById("market-location").textContent =
property.market.location;


document.getElementById("market-score").textContent =
property.market.score + " / 100";


document.getElementById("market-rating").textContent =
property.market.rating;


document.getElementById("market-summary").textContent =
property.market.summary;



document.getElementById("market-indicator").style.left =

property.market.score +

"%";



const marketStats =
document.getElementById("market-stats");


marketStats.innerHTML = "";



property.market.stats.forEach(stat=>{


    marketStats.innerHTML += `


    <div>


        <label>
        ${stat.label}
        </label>


        <strong ${
            stat.color
            ?
            `style="color:${stat.color}"`
            :
            ""
        }>

            ${stat.value}

        </strong>


    </div>


    `;


});



/* ==========================================
   MEDIA
========================================== */


if(property.media?.gallery){


    const gallery =
    document.getElementById("gallery");


    if(gallery){

        gallery.innerHTML = "";


        property.media.gallery.forEach(image=>{


            gallery.innerHTML += `

            <img src="${image}">

            `;


        });


    }


}
