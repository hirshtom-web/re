// =========================================
// REAL ESTATE PROFORMA ENGINE
// =========================================


function formatMoney(value){

    return "$" + Math.round(value).toLocaleString();

}


function formatPercent(value){

    return value.toFixed(2) + "%";

}



// =========================================
// LOAD PROPERTY DATA
// =========================================

function loadPropertyData(){

    const property = document.body.dataset;


    const fields = {

        purchasePrice: property.price || 0,

        noi: property.noi || 0,

        exitCap: property.cap || 7,

        downPayment: 35,

        interestRate: 6.5,

        amortization: 25,

        noiGrowth: 3,

        vacancy: 5,

        appreciation: 3,

        holdPeriod: 10

    };



    Object.keys(fields).forEach(id=>{

        const element = document.getElementById(id);

        if(element){

            element.value = fields[id];

        }

    });


}




// =========================================
// UNDERWRITING MODEL
// =========================================


function runModel(){


    const price =
    Number(document.getElementById("purchasePrice")?.value || 0);


    const baseNOI =
    Number(document.getElementById("noi")?.value || 0);



    if(!price || !baseNOI) return;



    const equityPercent =
    Number(document.getElementById("downPayment")?.value || 35);



    const equity =
    price * (equityPercent / 100);



    const loan =
    price - equity;



    const rate =
    Number(document.getElementById("interestRate")?.value || 6.5) / 100;



    const amort =
    Number(document.getElementById("amortization")?.value || 25);



    const monthlyRate =
    rate / 12;



    const payments =
    amort * 12;



    const monthlyPayment =
    loan *
    (monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1);



    const debtService =
    monthlyPayment * 12;



    // ADVANCED


    const vacancy =
    Number(document.getElementById("vacancy")?.value || 0) / 100;



    const noiGrowth =
    Number(document.getElementById("noiGrowth")?.value || 0) / 100;



    const appreciation =
    Number(document.getElementById("appreciation")?.value || 0) / 100;



    const hold =
    Number(document.getElementById("holdPeriod")?.value || 10);



    const exitCap =
    Number(document.getElementById("exitCap")?.value || 7) / 100;




    // VACANCY ADJUSTED NOI

    let noi =
    baseNOI * (1 - vacancy);



    const cashFlow =
    noi - debtService;



    const coc =
    (cashFlow / equity) * 100;



    const dscr =
    noi / debtService;



    // EXIT MODEL


    let futureNOI = noi;


    for(let i=1;i<=hold;i++){

        futureNOI *= (1 + noiGrowth);

    }



    const saleValue =
    futureNOI / exitCap;



    const appreciatedValue =
    price * Math.pow(
        1 + appreciation,
        hold
    );



    const finalValue =
    Math.max(
        saleValue,
        appreciatedValue
    );



    const equityGain =
    finalValue - loan - equity;



    const totalReturn =
    equity + equityGain;



    const equityMultiple =
    totalReturn / equity;



    const irr =
    (Math.pow(equityMultiple,1 / hold)-1) * 100;





    // OUTPUT


    update("resultEquity", formatMoney(equity));

    update("resultDebt", formatMoney(loan));

    update("resultCashFlow", formatMoney(cashFlow));

    update("resultCoc", formatPercent(coc));

    update("resultDebtService", formatMoney(debtService));

    update("resultDSCR", dscr.toFixed(2)+"x");

    update("resultSale", formatMoney(finalValue));

    update("resultProfit", formatMoney(equityGain));

    update("resultIRR", formatPercent(irr));

    update(
        "resultMultiple",
        equityMultiple.toFixed(2)+"x"
    );



    createGrowthChart(
        price,
        appreciation,
        hold
    );


}




function update(id,value){

    const element =
    document.getElementById(id);


    if(element){

        element.innerHTML=value;

    }

}




// =========================================
// CHART
// =========================================


function createGrowthChart(price, appreciation, hold){


    const canvas =
    document.getElementById("growthChart");


    if(!canvas) return;



    let values=[];

    let value=price;



    for(let i=0;i<=hold;i++){

        values.push(Math.round(value));

        value *= (1+appreciation);

    }



    if(window.proformaChart){

        window.proformaChart.destroy();

    }



    window.proformaChart =
    new Chart(canvas,{

        type:"line",

        data:{

            labels:
            values.map((x,i)=>"Year "+i),

            datasets:[{

                label:"Projected Property Value",

                data:values,

                borderColor:"#9a8050",

                backgroundColor:
                "rgba(154,128,80,.15)",

                fill:true,

                tension:.3

            }]

        },

        options:{

            responsive:true

        }

    });


}





// =========================================
// TABS
// =========================================


function setupTabs(){


const buttons =
document.querySelectorAll(".proforma-tabs button");


const tabs =
document.querySelectorAll(".tab-content");



buttons.forEach(button=>{


button.addEventListener("click",()=>{


buttons.forEach(btn=>
btn.classList.remove("active")
);



tabs.forEach(tab=>
tab.classList.remove("active")
);



button.classList.add("active");



const target =
document.getElementById(
button.dataset.tab
);



if(target){

target.classList.add("active");

}



});


});


}





// =========================================
// AUTO UPDATE
// =========================================


function setupInputs(){


document
.querySelectorAll(".proforma-widget input")
.forEach(input=>{


input.addEventListener(
"input",
runModel
);


});


}




// =========================================
// INIT
// =========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadPropertyData();


setupTabs();


setupInputs();


runModel();


});
