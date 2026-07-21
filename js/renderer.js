/* ==========================================
   PROPERTY IDENTIFIER
========================================== */


if(!window.properties){

    console.error("Properties database not loaded");

    throw new Error(
        "Missing properties.js"
    );

}



const params = new URLSearchParams(
    window.location.search
);


const propertyID =
    params.get("id") ||
    window.location.hash.substring(1) ||
    Object.keys(window.properties)[0];



const property =
    window.properties[propertyID];


window.currentProperty = property;



console.log("PROPERTY ID:", propertyID);
console.log("CURRENT PROPERTY:", property);



if(!property){

    document.body.innerHTML = `

    <h2 style="padding:40px;font-family:Inter">
        Property not found
    </h2>

    <p style="padding:0 40px;font-family:Inter">
        ID: ${propertyID || "missing"}
    </p>

    `;

    throw new Error(
        "Invalid property ID"
    );

}



/* ==========================================
   HELPERS
========================================== */


function safe(value, fallback="N/A"){

    if(
        value === undefined ||
        value === null ||
        value === ""
    ){

        return fallback;

    }

    return value;

}



function safeArray(value){

    return Array.isArray(value)
        ? value
        : [];

}



function money(value){

    if(!value) return "N/A";


    return "$" +
    Number(value).toLocaleString();

}



function emptyState(message){

    return `

    <div class="empty-state">

        ${message}

    </div>

    `;

}



/* ==========================================
   HERO
========================================== */


document.getElementById("property-title").textContent =
safe(property.hero?.title,"Investment Opportunity");



document.getElementById("property-subtitle").textContent =
safe(property.hero?.subtitle,"Premium Real Estate Investment");



document.getElementById("property-address").innerHTML =
safe(property.hero?.address,"Location Available Upon Request");





const image =
property.hero?.image ||
property.media?.mainImage ||
"../images/property-placeholder.jpg";



document.getElementById("property-image").src =
image;



document.getElementById("image-credit").textContent =
safe(
property.hero?.imageCaption,
"Property Image"
);




/* ==========================================
   SNAPSHOT
========================================== */


document.getElementById("purchase-price").textContent =
money(property.financial?.purchasePrice);



document.getElementById("annual-noi").textContent =
money(property.financial?.noi);



document.getElementById("cap-rate").textContent =
property.financial?.capRate
?
property.financial.capRate + "%"
:
"N/A";



document.getElementById("lease-term").textContent =
safe(
property.leaseDetails?.remainingTerm,
property.leaseTerm
);



document.getElementById("lease-structure").textContent =
safe(
property.leaseDetails?.structure,
property.leaseStructure
);





/* ==========================================
   ASSET OVERVIEW
========================================== */


document.getElementById("tenant").textContent =
safe(
property.tenantInfo?.name,
property.tenant
);



document.getElementById("building-size").textContent =
safe(
property.property?.buildingSize,
property.buildingSize
);



document.getElementById("lot-size").textContent =
safe(
property.property?.lotSize,
property.lotSize
);



document.getElementById("year-built").textContent =
safe(
property.property?.yearBuilt,
property.yearBuilt
);



document.getElementById("property-type").textContent =
safe(
property.property?.propertyType,
property.propertyType
);



document.getElementById("location").textContent =
safe(
property.property?.location,
property.location
);





/* ==========================================
   HIGHLIGHTS
========================================== */


const highlights =
document.getElementById("highlights");


const highlightData =
safeArray(property.highlights);



highlights.innerHTML = highlightData.length

?

highlightData.map((item,index)=>`

<div class="highlight">

<span>
${String(index+1).padStart(2,"0")}
</span>

<div>

<h3>
${safe(item.title)}
</h3>

<p>
${safe(item.text)}
</p>

</div>

</div>

`).join("")

:

emptyState(
"Investment highlights will be available soon."
);





/* ==========================================
   SUMMARY
========================================== */


const summary =
document.getElementById("summary");


const summaryData =
safeArray(property.summary);



summary.innerHTML = summaryData.length

?

summaryData.map(text=>`

<p>
${text}
</p>

`).join("")

:

emptyState(
"Executive summary coming soon."
);






/* ==========================================
   FINANCIAL OVERVIEW
========================================== */


const financial =
document.getElementById("financial-overview");


const financialData =
safeArray(property.financialOverview);



financial.innerHTML = financialData.length

?

financialData.map(item=>`

<div>

<span>
${safe(item.label)}
</span>


<strong>
${safe(item.value)}
</strong>


</div>

`).join("")

:

emptyState(
"Financial overview pending."
);






/* ==========================================
   SCORECARD
========================================== */


const score =
property.score || {};



document.getElementById("scoreValue").textContent =
safe(score.value,"--");



document.getElementById("scoreLabel").textContent =
safe(score.label,"Pending");



document.getElementById("score-summary").textContent =
safe(
score.summary,
"Investment assessment pending."
);




const scoreGrid =
document.getElementById("score-grid");



const scoreCards =
safeArray(score.cards);



scoreGrid.innerHTML = scoreCards.length

?

scoreCards.map(card=>`

<div class="score-card">


<label>
${safe(card.label)}
</label>


<strong>
${safe(card.value)}
</strong>


<small>
${safe(card.description)}
</small>


</div>


`).join("")

:

emptyState(
"Investment scorecard pending."
);






/* ==========================================
   PROPERTY FACTS
========================================== */


const facts =
document.getElementById("property-facts");



const factData =
safeArray(property.propertyFacts);



facts.innerHTML = factData.length

?

factData.map(item=>`

<div>

<span>
${safe(item.label)}
</span>


<strong>
${safe(item.value)}
</strong>


</div>


`).join("")

:

emptyState(
"Property facts pending."
);






/* ==========================================
   LOCATION
========================================== */


document.getElementById("location-title").textContent =
safe(
property.locationOverview,
property.location
);



const locationHighlights =
document.getElementById("location-highlights");



locationHighlights.innerHTML =
safeArray(property.locationHighlights)

.map(item=>`

<li>
${item}
</li>

`).join("");





const map =
document.getElementById("property-map");



if(
map &&
property.coordinates
){

map.src =

"https://www.google.com/maps?q=" +

property.coordinates.latitude +

"," +

property.coordinates.longitude +

"&output=embed";

}







/* ==========================================
   RISK
========================================== */


const risk =
document.getElementById("risk-grid");



const risks =
safeArray(property.riskStrategy);



risk.innerHTML = risks.length

?

risks.map(item=>`

<div>


<h3>
${safe(item.title)}
</h3>


<p>
${safe(item.text)}
</p>


</div>


`).join("")

:

emptyState(
"Risk analysis pending."
);






/* ==========================================
   MARKET
========================================== */


const market =
property.market || {};



document.getElementById("market-location").textContent =
safe(
market.location,
"Market Data Pending"
);



document.getElementById("market-score").textContent =
market.score
?
market.score + " / 100"
:
"--";



document.getElementById("market-rating").textContent =
safe(
market.rating,
"Analysis Pending"
);



document.getElementById("market-summary").textContent =
safe(
market.summary,
"Market insights will be added."
);



const indicator =
document.getElementById("market-indicator");


if(indicator){

indicator.style.left =
(market.score || 0) + "%";

}




const marketStats =
document.getElementById("market-stats");



const stats =
safeArray(market.stats);



marketStats.innerHTML = stats.length

?

stats.map(stat=>`

<div>


<label>
${safe(stat.label)}
</label>


<strong ${
stat.color
?
`style="color:${stat.color}"`
:
""
}>

${safe(stat.value)}

</strong>


</div>


`).join("")

:

emptyState(
"Market statistics pending."
);






/* ==========================================
   MEDIA
========================================== */


const gallery =
document.getElementById("gallery");



if(
gallery
){

const images =
safeArray(property.media?.gallery);



gallery.innerHTML =
images.length

?

images.map(image=>`

<img src="${image}">

`).join("")

:

emptyState(
"Additional property images coming soon."
);


}



console.log(
"Renderer loaded successfully:",
propertyID
);


function openAIRating(){

    document
    .getElementById("aiModal")
    .classList.add("active");

}


function closeAIRating(){

    document
    .getElementById("aiModal")
    .classList.remove("active");

}
