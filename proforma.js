// =========================================
// REAL ESTATE PROFORMA ENGINE
// =========================================


function formatMoney(value) {

    return "$" + Math.round(value).toLocaleString();

}


function formatPercent(value) {

    return value.toFixed(2) + "%";

}



// =========================================
// LOAD PROPERTY DATA
// =========================================

function loadPropertyData() {


    const property = document.body.dataset;


    const purchasePrice =
        document.getElementById("purchasePrice");


    if(!purchasePrice) return;


    purchasePrice.value =
        property.price || 0;


    document.getElementById("noi").value =
        property.noi || 0;


    document.getElementById("exitCap").value =
        property.cap || 7;


    document.getElementById("downPayment").value =
        35;


    document.getElementById("interestRate").value =
        6.5;


    document.getElementById("amortization").value =
        25;


    document.getElementById("noiGrowth").value =
        3;


    document.getElementById("holdPeriod").value =
        10;

}



// =========================================
// UNDERWRITING MODEL
// =========================================

function runModel() {


    const price =
        Number(
            document.getElementById("purchasePrice").value
        );


    const noi =
        Number(
            document.getElementById("noi").value
        );


    const growth =
        Number(
            document.getElementById("noiGrowth").value
        ) / 100;


    const down =
        Number(
            document.getElementById("downPayment").value
        ) / 100;


    const rate =
        Number(
            document.getElementById("interestRate").value
        ) / 100;


    const amortYears =
        Number(
            document.getElementById("amortization").value
        );


    const hold =
        Number(
            document.getElementById("holdPeriod").value
        );


    const exitCap =
        Number(
            document.getElementById("exitCap").value
        ) / 100;



    const equity =
        price * down;


    const loan =
        price - equity;


    const monthlyRate =
        rate / 12;


    const payments =
        amortYears * 12;



    const monthlyPayment =
        loan *
        (monthlyRate * Math.pow(1 + monthlyRate, payments)) /
        (Math.pow(1 + monthlyRate, payments) - 1);



    const annualDebt =
        monthlyPayment * 12;



    const cashFlow =
        noi - annualDebt;



    const coc =
        (cashFlow / equity) * 100;



    let futureNOI =
        noi;



    for(let i = 1; i < hold; i++){

        futureNOI *= (1 + growth);

    }



    const salePrice =
        futureNOI / exitCap;


    const profit =
        salePrice - price;



    document.getElementById("resultEquity").innerHTML =
        formatMoney(equity);


    document.getElementById("resultDebt").innerHTML =
        formatMoney(loan);


    document.getElementById("resultCashFlow").innerHTML =
        formatMoney(cashFlow);


    document.getElementById("resultCoc").innerHTML =
        formatPercent(coc);


    document.getElementById("resultSale").innerHTML =
        formatMoney(salePrice);


    document.getElementById("resultProfit").innerHTML =
        formatMoney(profit);

}



// =========================================
// TABS
// =========================================

function setupTabs(){

    const buttons = document.querySelectorAll(".proforma-tabs button");
    const tabs = document.querySelectorAll(".tab-content");


    buttons.forEach(button => {

        button.addEventListener("click", function(e){

            e.preventDefault();


            buttons.forEach(btn=>{
                btn.classList.remove("active");
            });


            tabs.forEach(tab=>{
                tab.classList.remove("active");
            });


            this.classList.add("active");


            const target =
                document.getElementById(this.dataset.tab);


            if(target){
                target.classList.add("active");
            }

        });

    });

}


