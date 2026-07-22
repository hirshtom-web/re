const residences = [

{

id:"oceanfront-miami-01",


/* =========================
   BASIC INFO
========================= */

title:"Oceanfront Residences",

subtitle:"Designed For Living & Investing",

type:"Luxury Condominium",

status:"Pre-Construction",

location:"Miami Beach, Florida",

address:"Coming Soon",

description:
"A limited collection of luxury residences in one of Florida's most desirable markets. Secure early access before public release.",



/* =========================
   PRICING
========================= */

price:"$1.2M+",

priceRange:"$1.2M - $8M",

pricePerSqft:"TBD",

hoa:"TBD",

estimatedTaxes:"TBD",



/* =========================
   PROPERTY FACTS
========================= */

bedrooms:"1 - 4 Bedrooms",

bathrooms:"1.5 - 5 Bathrooms",

interiorSize:"900 - 3,500 SF",

terraceSize:"Private Terraces",

floors:"40 Floors",

units:"250 Residences",

delivery:"2028",

yearBuilt:"2028",



/* =========================
   LOCATION
========================= */

neighborhood:"Miami Beach",

city:"Miami",

state:"Florida",

country:"USA",

coordinates:{
    lat:25.7907,
    lng:-80.1300
},


nearby:[

{
title:"Beach Access",
distance:"2 minutes",
icon:"beach_access"
},

{
title:"Fine Dining",
distance:"5 minutes",
icon:"restaurant"
},

{
title:"Airport",
distance:"20 minutes",
icon:"flight"
}

],



/* =========================
   TIMELINE
========================= */

timeline:[

{
year:"2026",
label:"Reservations Open"
},

{
year:"2027",
label:"Construction Progress"
},

{
year:"2028",
label:"Residence Delivery"
}

],



/* =========================
   GALLERY
========================= */

images:[

"https://static.wixstatic.com/media/1799ca_f7222329a28c41179031624a42415fbc~mv2.jpg",

"https://static.wixstatic.com/media/1799ca_f7222329a28c41179031624a42415fbc~mv2.jpg",

"https://static.wixstatic.com/media/1799ca_f7222329a28c41179031624a42415fbc~mv2.jpg"

],



/* =========================
   AMENITIES
========================= */

amenities:[

"Private Beach Access",

"Infinity Pool",

"Fitness & Wellness Center",

"Residents Lounge",

"Valet & Concierge",

"Smart Home Technology"

],



/* =========================
   HIGHLIGHTS
========================= */

highlights:[

{
title:"Early Pricing Advantage",

text:
"Pre-construction buyers gain access before completion, allowing potential appreciation during development and delivery phases."
},


{
title:"Strong Rental Demand",

text:
"Florida's population growth and tourism economy continue supporting long-term and seasonal rental demand."
},


{
title:"Prime Location",

text:
"Positioned near beaches, dining, entertainment, and major employment centers."
}

],



/* =========================
   AI RATING
========================= */

aiRating:{

overall:9.7,

confidence:96,


summary:
"Strong luxury positioning with excellent location fundamentals, lifestyle appeal, and long-term market potential.",


scores:[

{
label:"Investment Potential",
value:9.8
},

{
label:"Location Quality",
value:9.9
},

{
label:"Rental Demand",
value:9.4
},

{
label:"Lifestyle",
value:9.8
},

{
label:"Build Quality",
value:9.6
},

{
label:"Market Value",
value:9.2
}

],


strengths:[

"Prime waterfront location",

"Luxury amenities",

"Limited inventory",

"Strong rental appeal"

],


risks:[

"Premium pricing",

"Market conditions may change"

]

},



/* =========================
   FLOOR PLANS
========================= */

floorPlans:[

{

name:"Residence A",

beds:2,

baths:2.5,

sqft:"1,850",

price:"$2.4M",

floor:"18",

view:"Ocean View",

image:"FLOORPLAN_IMAGE"

},


{

name:"Residence B",

beds:3,

baths:3.5,

sqft:"2,600",

price:"$3.8M",

floor:"32",

view:"Skyline View",

image:"FLOORPLAN_IMAGE"

}

],



/* =========================
   DEVELOPER / TEAM
========================= */

team:[

{

role:"Developer",

name:"Developer Name",

logo:"LOGO_URL",

description:
"Recognized for luxury developments and architectural excellence."

},


{

role:"Architect",

name:"Architecture Studio",

logo:"LOGO_URL",

description:
"International design studio creating iconic residential destinations."

}

],



/* =========================
   DOCUMENTS
========================= */

documents:[

{
title:"Brochure",
file:"#"
},

{
title:"Floor Plans",
file:"#"
},

{
title:"Price Sheet",
file:"#"
}

],



/* =========================
   LEGAL
========================= */

disclaimer:
"Information provided for illustrative purposes only. Pricing, availability, specifications, and features are subject to change without notice."

}

];

/* =========================
   GALLERY POPUP
========================= */

function openMediaLibrary(){

    const galleryImages = document.querySelectorAll(
        ".gallery-feature img, .gallery-grid img"
    );

    const mediaContent = document.getElementById("mediaContent");

    mediaContent.innerHTML = "";

    galleryImages.forEach(img => {

        const newImg = document.createElement("img");

        newImg.src = img.src;
        newImg.alt = img.alt;

        mediaContent.appendChild(newImg);

    });


    document.getElementById("mediaLibrary")
    .classList.add("active");
}


function closeMediaLibrary(){

    document.getElementById("mediaLibrary")
    .classList.remove("active");

}
