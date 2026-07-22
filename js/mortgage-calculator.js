document.addEventListener("DOMContentLoaded", function(){


const property = document.querySelector(".property-data");


// PROPERTY DATA

const taxRate = Number(property.dataset.taxRate);

const insuranceRate = Number(property.dataset.insuranceRate);

const hoaSqft = Number(property.dataset.hoaSqft);

const unitSize = Number(property.dataset.unitSize);




// USER CONTROLS

const priceInput = document.getElementById("home-price");

const downInput = document.getElementById("down-payment");

const rateInput = document.getElementById("interest-rate");

const loanYears = document.getElementById("loan-years");





// DISPLAY VALUES

const priceDisplay = document.getElementById("price-display");

const downDisplay = document.getElementById("down-display");





// RESULTS

const monthlyPayment = document.getElementById("monthly-payment");

const principalResult = document.getElementById("principal-interest");

const taxResult = document.getElementById("property-tax-result");

const insuranceResult = document.getElementById("insurance-result");

const hoaResult = document.getElementById("hoa-result");

const pmiResult = document.getElementById("pmi-result");





function calculate(){


let price = 
Number(priceInput.value);



let downPaymentPercent =
Number(downInput.value);



let rate =
parseFloat(rateInput.value)
/
100
/
12;



let years =
Number(loanYears.value);



let loanAmount =
price -
(price * downPaymentPercent / 100);



let months =
years * 12;



let mortgage;



if(rate === 0){

    mortgage = loanAmount / months;

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
    Math.pow(1 + rate, months)
    -
    1
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





// DONUT %

let mortgagePercent =
(mortgage / total) * 100;


let taxPercent =
(taxes / total) * 100;


let insurancePercent =
(insurance / total) * 100;


let hoaPercent =
(hoa / total) * 100;





// UPDATE DONUT

let ring =
document.getElementById("payment-ring");


if(ring){

ring.style.background =

`
conic-gradient(
#6D5DFB 0% ${mortgagePercent}%,
#3B82F6 ${mortgagePercent}% ${mortgagePercent + taxPercent}%,
#10B981 ${mortgagePercent + taxPercent}% ${mortgagePercent + taxPercent + insurancePercent}%,
#CBD5E1 ${mortgagePercent + taxPercent + insurancePercent}% ${mortgagePercent + taxPercent + insurancePercent + hoaPercent}%,
transparent ${mortgagePercent + taxPercent + insurancePercent + hoaPercent}% 100%
)
`;

}






// UPDATE NUMBERS

monthlyPayment.innerHTML =
"$" + Math.round(total).toLocaleString();



principalResult.innerHTML =
"$" + Math.round(mortgage).toLocaleString();



taxResult.innerHTML =
"$" + Math.round(taxes).toLocaleString();



insuranceResult.innerHTML =
"$" + Math.round(insurance).toLocaleString();



hoaResult.innerHTML =
"$" + Math.round(hoa).toLocaleString();



pmiResult.innerHTML =
"$0";


}







// HOME PRICE SLIDER

priceInput.addEventListener(
"input",
function(){


priceDisplay.innerHTML =

"$" + Number(this.value).toLocaleString();


calculate();


});






// DOWN PAYMENT SLIDER

downInput.addEventListener(
"input",
function(){


downDisplay.innerHTML =

this.value + "%";


calculate();


});







// INTEREST RATE

rateInput.addEventListener(
"input",
calculate
);







// LOAN TERM

loanYears.addEventListener(
"change",
calculate
);






// INITIAL LOAD

priceDisplay.innerHTML =

"$" + Number(priceInput.value).toLocaleString();



downDisplay.innerHTML =

downInput.value + "%";



calculate();



});
