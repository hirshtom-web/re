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

    const purchasePrice = document.getElementById("purchasePrice");

    if(!purchasePrice) return;


    purchasePrice.value = property.price || 0;

    document.getElementById("noi").value =
        property.noi || 0;


    document.getElementById("exitCap").value =
        property.cap || 7;


    document.getElementById("downPayment").value = 35;


    document.getElementById("interestRate").value =
        6.5;


    document.getElementById("amortization").value =
        25;


    document.getElementById("noiGrowth").value =
        3;


    document.getElementById("appreciation").value =
        3;


    document.getElementById("holdPeriod").value =
        10;

}



// =========================================
// UNDERWRITING MODEL
// =========================================

function runModel(){


    const price =
        Number(document.getElementById("purchasePrice").value);


    const noi =
        Number(document.getElementById("noi").value);


    if(!price || !noi) return;



    const equityPercent =
       Number(document.getElementById("downPayment").value);



    const equity =
        price * (equityPercent / 100);


    const loan =
        price - equity;



    const rate =
        Number(document.getElementById("interestRate").value) / 100;


    const amort =
        Number(document.getElementById("amortization").value);



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



    const cashFlow =
        noi - debtService;



    const coc =
        (cashFlow / equity) * 100;



    const dscr =
        noi / debtService;



    const growth =
        Number(document.getElementById("noiGrowth").value) / 100;



    const appreciation =
        Number(document.getElementById("appreciation").value) / 100;



    const hold =
        Number(document.getElementById("holdPeriod").value);



    const exitCap =
        Number(document.getElementById("exitCap").value) / 100;



    let futureNOI = noi;


    let futureValue = price;



    for(let i = 1; i <= hold; i++){

        futureNOI *= (1 + growth);

        futureValue *= (1 + appreciation);

    }



    const saleValue =
        futureNOI / exitCap;



    const profit =
        saleValue - equity;



    const equityMultiple =
        (profit + equity) / equity;



    const irr =
        (Math.pow(equityMultiple,1 / hold)-1) * 100;




    document.getElementById("resultEquity").innerHTML =
        formatMoney(equity);


    document.getElementById("resultDebt").innerHTML =
        formatMoney(loan);


    document.getElementById("resultCashFlow").innerHTML =
        formatMoney(cashFlow);


    document.getElementById("resultCoc").innerHTML =
        formatPercent(coc);


    document.getElementById("resultDebtService").innerHTML =
        formatMoney(debtService);


    document.getElementById("resultDSCR").innerHTML =
        dscr.toFixed(2) + "x";


    document.getElementById("resultSale").innerHTML =
        formatMoney(saleValue);


    document.getElementById("resultProfit").innerHTML =
        formatMoney(profit);


    if(document.getElementById("resultIRR")){

        document.getElementById("resultIRR").innerHTML =
            formatPercent(irr);

    }


    if(document.getElementById("resultMultiple")){

        document.getElementById("resultMultiple").innerHTML =
            equityMultiple.toFixed(2) + "x";

    }



    createGrowthChart(price, appreciation, hold);

}



// =========================================
// GROWTH CHART
// =========================================

function createGrowthChart(price, appreciation, hold){


    const canvas =
        document.getElementById("growthChart");


    if(!canvas) return;


    let values = [];

    let value = price;


    for(let i=0;i<=hold;i++){

        values.push(Math.round(value));

        value *= (1 + appreciation);

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

                backgroundColor:"rgba(154,128,80,.15)",

                fill:true,

                tension:.3

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:true
                }

            }

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
                document.getElementById(button.dataset.tab);



            if(target){

                target.classList.add("active");

            }


        });


    });

}



// =========================================
// INITIALIZE
// =========================================

document.addEventListener("DOMContentLoaded",()=>{


    loadPropertyData();


    setupTabs();




    const run =
        document.getElementById("runProforma");


    if(run){

        run.addEventListener(
            "click",
            runModel
        );

    }



});

function toggleAdvanced(){

    const advanced = document.getElementById("advancedFields");
    const button = document.querySelector(".advanced-toggle");

    advanced.classList.toggle("active");


    if(advanced.classList.contains("active")){

        button.innerHTML = "− Advanced Assumptions";

    } else {

        button.innerHTML = "+ Advanced Assumptions";

    }

}
