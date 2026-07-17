const property = properties["starbucks-altamonte"];


/* HERO */

document.getElementById("property-title").textContent =
    property.title;

document.getElementById("property-subtitle").textContent =
    property.subtitle;

document.getElementById("property-address").textContent =
    property.address;



/* SNAPSHOT */

document.getElementById("purchase-price").textContent =
    "$" + property.purchasePrice.toLocaleString();

document.getElementById("annual-noi").textContent =
    "$" + property.noi.toLocaleString();

document.getElementById("cap-rate").textContent =
    property.capRate + "%";

document.getElementById("lease-term").textContent =
    property.leaseTerm;

document.getElementById("lease-structure").textContent =
    property.leaseStructure;



/* IMAGE */

document.getElementById("property-image").src =
    property.image;

document.getElementById("image-credit").textContent =
    property.imageCaption;



/* ASSET OVERVIEW */

document.getElementById("tenant").textContent =
    property.tenant;

document.getElementById("building-size").textContent =
    property.buildingSize;

document.getElementById("lot-size").textContent =
    property.lotSize;

document.getElementById("year-built").textContent =
    property.yearBuilt;

document.getElementById("property-type").textContent =
    property.propertyType;

document.getElementById("location").textContent =
    property.location;



/* HIGHLIGHTS */

const highlights =
document.getElementById("highlights");


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



/* SUMMARY */

const summary =
document.getElementById("summary");


property.summary.forEach(text=>{

    summary.innerHTML += `
        <p>${text}</p>
    `;

});



/* FINANCIAL OVERVIEW */

const financial =
document.getElementById("financial-overview");


property.financialOverview.forEach(item=>{

    financial.innerHTML += `

    <div>

        <span>${item.label}</span>

        <strong>${item.value}</strong>

    </div>

    `;

});



/* SCORECARD */

document.getElementById("scoreValue").textContent =
    property.score;


document.getElementById("scoreLabel").textContent =
    property.scoreLabel;


document.getElementById("score-summary").textContent =
    property.scoreSummary;


const scoreGrid =
document.getElementById("score-grid");


property.scoreCards.forEach(card=>{

    scoreGrid.innerHTML += `

    <div class="score-card">

        <label>${card.label}</label>

        <strong>${card.value}</strong>

        <small>${card.description}</small>

    </div>

    `;

});



/* PROPERTY FACTS */

const facts =
document.getElementById("property-facts");


property.propertyFacts.forEach(item=>{

    facts.innerHTML += `

    <div>

        <span>${item.label}</span>

        <strong>${item.value}</strong>

    </div>

    `;

});



/* LOCATION */

document.getElementById("location-title").textContent =
    property.locationOverview;


property.locationHighlights.forEach(item=>{

    document.getElementById("location-highlights").innerHTML +=
    `<li>${item}</li>`;

});


document.getElementById("property-map").src =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(property.address) +
    "&output=embed";



/* RISK */

const risk =
document.getElementById("risk-grid");


property.riskStrategy.forEach(item=>{

    risk.innerHTML += `

    <div>

        <h3>${item.title}</h3>

        <p>${item.text}</p>

    </div>

    `;

});



/* MARKET */

document.getElementById("market-location").textContent =
    property.market.location;


document.getElementById("market-score").textContent =
    property.market.score + " / 100";


document.getElementById("market-rating").textContent =
    property.market.rating;


document.getElementById("market-summary").textContent =
    property.market.summary;


document.getElementById("market-indicator").style.left =
    property.market.score + "%";


const marketStats =
document.getElementById("market-stats");


property.market.stats.forEach(stat=>{

    marketStats.innerHTML += `

    <div>

        <label>${stat.label}</label>

        <strong ${
            stat.color 
            ? `style="color:${stat.color}"` 
            : ""
        }>
            ${stat.value}
        </strong>

    </div>

    `;

});
