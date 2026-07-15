// =========================================
// SIMPLE REAL ESTATE UNDERWRITING ENGINE
// Version 1.0
// =========================================


function formatMoney(value) {
    return "$" + Math.round(value).toLocaleString();
}


function formatPercent(value) {
    return value.toFixed(2) + "%";
}


// =========================================
// UNDERWRITING MODEL
// =========================================

function runModel() {

    // -----------------------------
    // Inputs
    // -----------------------------

    const price = Number(document.getElementById("purchasePrice").value);

    const noi = Number(document.getElementById("noi").value);

    const growth = Number(document.getElementById("noiGrowth").value) / 100;

    const down = Number(document.getElementById("downPayment").value) / 100;

    const rate = Number(document.getElementById("interestRate").value) / 100;

    const amortYears = Number(document.getElementById("amortization").value);

    const hold = Number(document.getElementById("holdPeriod").value);

    const exitCap = Number(document.getElementById("exitCap").value) / 100;


    // -----------------------------
    // Financing
    // -----------------------------

    const equity = price * down;

    const loan = price - equity;

    const monthlyRate = rate / 12;

    const payments = amortYears * 12;


    const monthlyPayment =
        loan *
        (monthlyRate * Math.pow(1 + monthlyRate, payments)) /
        (Math.pow(1 + monthlyRate, payments) - 1);


    const annualDebt = monthlyPayment * 12;


    // -----------------------------
    // Year One
    // -----------------------------

    const cashFlow = noi - annualDebt;

    const coc = (cashFlow / equity) * 100;


    // -----------------------------
    // Future NOI
    // -----------------------------

    let futureNOI = noi;


    for (let i = 1; i < hold; i++) {

        futureNOI *= (1 + growth);

    }


    // -----------------------------
    // Sale Price
    // -----------------------------

    const salePrice = futureNOI / exitCap;

    const profit = salePrice - price;



    // -----------------------------
    // Outputs
    // -----------------------------

    document.getElementById("equityRequired").innerHTML =
        formatMoney(equity);

    document.getElementById("loanAmount").innerHTML =
        formatMoney(loan);

    document.getElementById("debtService").innerHTML =
        formatMoney(annualDebt);

    document.getElementById("cashFlow").innerHTML =
        formatMoney(cashFlow);

    document.getElementById("coc").innerHTML =
        formatPercent(coc);

    document.getElementById("salePrice").innerHTML =
        formatMoney(salePrice);

    document.getElementById("profit").innerHTML =
        formatMoney(profit);

    document.getElementById("irr").innerHTML =
        "Coming Soon";

    document.getElementById("multiple").innerHTML =
        "Coming Soon";



    // -----------------------------
    // Cash Flow Table
    // -----------------------------

    let html = "";

    let currentNOI = noi;


    for (let year = 1; year <= hold; year++) {


        const yearlyCash =
            currentNOI - annualDebt;


        html += `

        <tr>

            <td>${year}</td>

            <td>${formatMoney(currentNOI)}</td>

            <td>${formatMoney(annualDebt)}</td>

            <td>${formatMoney(yearlyCash)}</td>

        </tr>

        `;


        currentNOI *= (1 + growth);

    }


    document.getElementById("cashflowTable").innerHTML = html;

}



// =========================================
// PAGE LOAD
// =========================================

window.addEventListener("load", () => {


    // Run calculations if fields exist
    if(document.getElementById("purchasePrice")) {

        runModel();

    }



    // =========================================
    // PROFORMA BUTTON + MODAL
    // =========================================

    const fab =
        document.getElementById("proformaFab");


    const modal =
        document.getElementById("proformaModal");


    const closeBtn =
        document.querySelector(".close-btn");



    if(!fab || !modal) {

        console.log("Proforma elements not found");

        return;

    }



    // Floating button show/hide

    window.addEventListener("scroll", () => {


        if(window.scrollY > 400) {

            fab.classList.add("visible");


        } else {

            fab.classList.remove("visible");

        }


    });



    // Open modal

    fab.addEventListener("click", () => {


        modal.classList.add("open");


    });



    // Close button

    if(closeBtn) {

        closeBtn.addEventListener("click", () => {

            modal.classList.remove("open");

        });

    }



    // Click outside modal closes

    modal.addEventListener("click", (event) => {


        if(event.target === modal) {

            modal.classList.remove("open");

        }


    });


});
