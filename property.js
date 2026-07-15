const proformaButton =
document.querySelector(".proforma-toggle");


const proforma =
document.querySelector(".proforma-container");


proformaButton.addEventListener(
"click",
()=>{

    proforma.classList.toggle("open");

    proformaButton.innerHTML =
    proforma.classList.contains("open")
    ? "Close Proforma"
    : "📊 Run Proforma";

});
