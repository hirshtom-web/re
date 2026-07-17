const property = properties["starbucks-altamonte"];

document.getElementById("property-title").textContent =
    property.title;

document.getElementById("property-subtitle").textContent =
    property.subtitle;

document.getElementById("property-address").innerHTML =
    property.address;

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
