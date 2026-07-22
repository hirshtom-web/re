document.addEventListener("DOMContentLoaded", function(){


const property = document.querySelector(".property-data");


const price = Number(property.dataset.price);

const downPaymentPercent = Number(property.dataset.downPayment);

const taxRate = Number(property.dataset.taxRate);

const insuranceRate = Number(property.dataset.insuranceRate);

const hoaSqft = Number(property.dataset.hoaSqft);

const unitSize = Number(property.dataset.unitSize);



const rateInput = document.getElementById("interest-rate");

const loanYears = document.getElementById("loan-years");



const monthlyPayment = document.getElementById("monthly-payment");

const principalResult = document.getElementById("principal-interest");

const taxResult = document.getElementById("property-tax-result");

const insuranceResult = document.getElementById("insurance-result");

const hoaResult = document.getElementById("hoa-result");

const pmiResult = document.getElementById("pmi-result");





function calculate(){


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




let mortgage =
loanAmount *
(rate * Math.pow(1 + rate, months))
/
(Math.pow(1 + rate, months)-1);




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




// interest +/- buttons


document.getElementById("rate-up")
.addEventListener("click",function(){

let rate =
parseFloat(rateInput.value);

rate += .05;

rateInput.value =
rate.toFixed(2)+"%";

calculate();

});



document.getElementById("rate-down")
.addEventListener("click",function(){

let rate =
parseFloat(rateInput.value);

rate -= .05;

rateInput.value =
rate.toFixed(2)+"%";

calculate();

});




// mortgage period change

loanYears.addEventListener(
"change",
calculate
);



calculate();



});
