/* =========================
   MORTGAGE CALCULATOR
========================= */


document.addEventListener("DOMContentLoaded", function(){


const property = document.querySelector(".property-data");


// PROPERTY DATA

const taxRate =
Number(property?.dataset.taxRate || 0);

const insuranceRate =
Number(property?.dataset.insuranceRate || 0);

const hoaSqft =
Number(property?.dataset.hoaSqft || 0);

const unitSize =
Number(property?.dataset.unitSize || 0);




// USER CONTROLS

const priceInput =
document.getElementById("home-price");

const downInput =
document.getElementById("down-payment");

const rateInput =
document.getElementById("interest-rate");

const loanYears =
document.getElementById("loan-years");




// DISPLAY VALUES

const priceDisplay =
document.getElementById("price-display");

const downDisplay =
document.getElementById("down-display");




// RESULTS

const monthlyPayment =
document.getElementById("monthly-payment");

const principalResult =
document.getElementById("principal-interest");

const taxResult =
document.getElementById("property-tax-result");

const insuranceResult =
document.getElementById("insurance-result");

const hoaResult =
document.getElementById("hoa-result");

const pmiResult =
document.getElementById("pmi-result");





if(
!priceInput ||
!downInput ||
!rateInput ||
!loanYears
){
    return;
}





function calculate(){


let price =
Number(priceInput.value);


let downPaymentPercent =
Number(downInput.value);


let rate =
parseFloat(rateInput.value) / 100 / 12;


let years =
Number(loanYears.value);



let loanAmount =
price -
(price * downPaymentPercent / 100);



let months =
years * 12;



let mortgage;


if(rate === 0){

    mortgage =
    loanAmount / months;

}
else{

    mortgage =

    loanAmount *

    (
        rate *
        Math.pow(1 + rate, months)
    )

    /

    (
        Math.pow(1 + rate, months) - 1
    );

}





let taxes =
(price * taxRate / 100) / 12;



let insurance =
(price * insuranceRate / 100) / 12;



let hoa =
hoaSqft * unitSize;



let total =
mortgage +
taxes +
insurance +
hoa;





let mortgagePercent =
(mortgage / total) * 100;


let taxPercent =
(taxes / total) * 100;


let insurancePercent =
(insurance / total) * 100;


let hoaPercent =
(hoa / total) * 100;






const ring =
document.getElementById("payment-ring");


if(ring){

ring.style.background =

`
conic-gradient(
#6D5DFB 0% ${mortgagePercent}%,
#C9A86A ${mortgagePercent}% ${mortgagePercent + taxPercent}%,
#7FA98B ${mortgagePercent + taxPercent}% ${mortgagePercent + taxPercent + insurancePercent}%,
#B8BCC6 ${mortgagePercent + taxPercent + insurancePercent}% ${mortgagePercent + taxPercent + insurancePercent + hoaPercent}%,
#E5E0D8 ${mortgagePercent + taxPercent + insurancePercent + hoaPercent}% 100%
)
`;

}





monthlyPayment.textContent =
"$" + Math.round(total).toLocaleString();


principalResult.textContent =
"$" + Math.round(mortgage).toLocaleString();


taxResult.textContent =
"$" + Math.round(taxes).toLocaleString();


insuranceResult.textContent =
"$" + Math.round(insurance).toLocaleString();


hoaResult.textContent =
"$" + Math.round(hoa).toLocaleString();


pmiResult.textContent =
"$0";


}





// EXPOSE TO PROPERTY LOADER

window.updateMortgage = function(){


priceDisplay.textContent =
"$" + Number(priceInput.value).toLocaleString();


downDisplay.textContent =
downInput.value + "%";


calculate();


};






// LISTENERS


priceInput.addEventListener(
"input",
function(){

    window.updateMortgage();

});



downInput.addEventListener(
"input",
function(){

    window.updateMortgage();

});



rateInput.addEventListener(
"input",
function(){

    window.updateMortgage();

});



loanYears.addEventListener(
"change",
function(){

    window.updateMortgage();

});






// INITIAL LOAD

window.updateMortgage();



});
