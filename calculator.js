/* =========================================
   FORMAT NUMBERS WITH COMMAS
========================================= */
function formatWithCommas(input) {
    let value = input.value.replace(/[^\d]/g, '');
    input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* =========================================
   ANIMATE VALUE DISPLAY
========================================= */
function animateValue(id, start, end, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    const range = end - start;
    const startTime = performance.now();

    function frame(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = start + range * progress;
        el.innerText = "$" + Math.floor(value).toLocaleString();
        if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

/* =========================================
   DYNAMIC EXPENSES
========================================= */
const expenseTypes = [
    "Repairs & Maintenance",
    "Legal Fees",
    "Vacancy Cost",
    "Bookkeeping & Accounting",
    "Bank Fees",
    "Other"
];

function activateAddExpense() {
    const wrapper = document.getElementById("addExpenseWrapper");
    const addInput = document.getElementById("addExpenseInput");

    addInput.onclick = () => {
        wrapper.innerHTML = "";
        const select = document.createElement("select");
        select.innerHTML = `<option value="">Select Expense</option>` +
            expenseTypes.map(t => `<option value="${t}">${t}</option>`).join("");
        wrapper.appendChild(select);

        select.onchange = () => {
            if (!select.value) return;

            const row = document.createElement("div");
            row.className = "input-group added-expense";
            row.innerHTML = `
                <label>${select.value}</label>
                <input type="text" class="expenseValue" placeholder="Amount">
                <button type="button" class="remove-btn">✕</button>
            `;
            row.querySelector(".expenseValue").oninput = e => formatWithCommas(e.target);
            row.querySelector(".remove-btn").onclick = () => row.remove();

            wrapper.parentElement.insertBefore(row, wrapper);

            wrapper.innerHTML = `
                <label style="visibility:hidden;">Add Expense</label>
                <input type="text" id="addExpenseInput" placeholder="+ Add Expense" readonly style="cursor:pointer;">
            `;
            activateAddExpense();
        };
    };
}
activateAddExpense();

function calculateTotalExpenses() {
    let total = 0;
    document.querySelectorAll('.expenseValue').forEach(exp => {
        total += Number(exp.value.replace(/,/g, '')) || 0;
    });
    return total;
}

/* =========================================
   ROI CALCULATION & CHART
========================================= */
let roiChart;

function renderROIChart(totalROI, cashFlow, NOI, coc) {
    const ctxEl = document.getElementById('roiChart');
    if (!ctxEl) return;

    const ctx = ctxEl.getContext('2d');
    if (roiChart) roiChart.destroy();

    roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total ROI', 'Cash Flow', 'NOI', 'Cash-on-Cash'],
            datasets: [{
                data: [totalROI, cashFlow, NOI, coc],
                backgroundColor: ['#005bff', '#00c851', '#ffbb33', '#ff4444']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function calculateROI() {
    const rentInput = document.getElementById('rentIncome');
    const appInput = document.getElementById('appreciationRate');

    const defaultRent = 2350;
    const defaultApp = 9.2;

    if (!rentInput.value || !appInput.value) {
        const proceed = confirm(
            "No Rent or Appreciation Rate entered. We'll use average market values (Rent: $2,350, Appreciation: 9.2%) for best results. Continue?"
        );
        if (!proceed) return;
    }

    const rent = Number(rentInput.value.replace(/,/g, '')) || defaultRent;
    const appreciationRate = (Number(appInput.value.replace(/,/g, '')) || defaultApp) / 100;

    const getVal = id => Number(document.getElementById(id)?.value.replace(/,/g, '')) || 0;
    const purchasePrice = getVal('purchasePrice');
    const years = Number(document.getElementById('yearsHold')?.value) || 0;

    const cashInvestment = getVal('cashInvestment');
    const loan = getVal('loanAmount');
    const mortgageRateMonthly = ((Number(document.getElementById('mortgageRate')?.value) || 0) / 100) / 12;
    const mortgageTermMonths = (Number(document.getElementById('mortgageTerm')?.value) || 0) * 12;

    const taxes = getVal('taxes');
    const insurance = getVal('insurance');
    const hoaAnnual = getVal('hoa') * 12;
    const vacancyRate = (Number(document.getElementById('vacancyRate')?.value) || 0) / 100;
    const mgmtRate = (Number(document.getElementById('managementFees')?.value) || 0) / 100;
    const dynamicExpenses = calculateTotalExpenses();

    const totalRentCollected = rent * 12 * years;
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate, years);
    const appreciationGain = futureValue - purchasePrice;
    let baseROI = totalRentCollected + appreciationGain;

    let mortgagePayment = 0;
    if (loan > 0 && mortgageRateMonthly > 0 && mortgageTermMonths > 0) {
        mortgagePayment = loan * (mortgageRateMonthly * Math.pow(1 + mortgageRateMonthly, mortgageTermMonths)) /
                          (Math.pow(1 + mortgageRateMonthly, mortgageTermMonths) - 1);
    }

    let mortgagePaidOff = 0;
    if (loan > 0 && mortgageRateMonthly > 0 && years > 0) {
        mortgagePaidOff = loan - (loan * Math.pow(1 + mortgageRateMonthly, mortgageTermMonths - years * 12));
        mortgagePaidOff = mortgagePaidOff > 0 ? mortgagePaidOff : 0;
    }

    const monthlyVacancyAdjustedRent = rent * (1 - vacancyRate);
    const monthlyOperatingExpenses = (taxes + insurance + dynamicExpenses) / 12 + (hoaAnnual / 12) + (rent * mgmtRate);
    const monthlyCashFlow = monthlyVacancyAdjustedRent - monthlyOperatingExpenses - mortgagePayment;
    const annualCashFlow = monthlyCashFlow * 12;
    const NOI = (monthlyVacancyAdjustedRent * 12) - (monthlyOperatingExpenses * 12);
    const CoC = cashInvestment > 0 ? (annualCashFlow / cashInvestment) * 100 : 0;

    const totalExpenses = (monthlyOperatingExpenses + mortgagePayment) * 12 * years;
    const totalROI = purchasePrice + totalRentCollected + appreciationGain - totalExpenses + mortgagePaidOff;

    animateValue("resultTotalROILarge", 0, totalROI, 1000);
    document.getElementById("resultCashFlowColumn").innerText = "Equity: $" + Math.floor(futureValue - loan).toLocaleString();
    document.getElementById("resultNOIColumn").innerText = "Gain: $" + Math.floor(appreciationGain).toLocaleString();
    document.getElementById("resultCoCColumn").innerText = "Total Rent: $" + Math.floor(totalRentCollected).toLocaleString();

    const capRate = purchasePrice ? (NOI / purchasePrice) * 100 : 0;
    const annualYield = cashInvestment ? (annualCashFlow / cashInvestment) * 100 : 0;
    const totalOperatingExpenses = taxes + insurance + hoaAnnual + dynamicExpenses + (rent * mgmtRate);
    const expenseRatio = totalRentCollected ? (totalOperatingExpenses / totalRentCollected) * 100 : 0;
    const DCR = mortgagePayment > 0 ? (NOI / (mortgagePayment * 12)) : 0;

    document.getElementById("capRateValue").innerText = capRate.toFixed(2) + "%";
    document.getElementById("yieldValue").innerText = annualYield.toFixed(2) + "%";
    document.getElementById("expenseRatioValue").innerText = expenseRatio.toFixed(2) + "%";
    document.getElementById("dcrValue").innerText = DCR.toFixed(2);

    renderROIChart(totalROI, annualCashFlow, NOI, CoC);
}

/* =========================================
   AUTO-FORMAT INPUTS
========================================= */
document.querySelectorAll('#purchasePrice,#cashInvestment,#loanAmount,#taxes,#insurance,#hoa,#rentIncome')
    .forEach(input => input.addEventListener('input', () => formatWithCommas(input)));

/* =========================================
   SUGGESTED INPUTS FOR RENT & APPRECIATION
========================================= */
function initSuggestedInputs() {
  const inputs = [
    { id: "rentIncome", min: 1, max: 999999, step: 1 },
    { id: "appreciationRate", min: 0.1, max: 99.9, step: 0.1 }
  ];

  inputs.forEach(cfg => {
    const input = document.getElementById(cfg.id);
    const suggest = Number(input.dataset.suggest);
    const popup = document.getElementById(cfg.id + "Suggestion");

    input.addEventListener("focus", () => {
      popup.style.display = "block";
      if (!input.value) input.value = suggest;
    });

    input.addEventListener("blur", () => {
      setTimeout(() => popup.style.display = "none", 200);
      if (Number(input.value) === suggest) input.value = "";
    });

    input.addEventListener("keydown", e => {
      let val = parseFloat(input.value.replace(/,/g,'')) || suggest;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        val += cfg.step;
        if (val > cfg.max) val = cfg.max;
        input.value = cfg.id === "rentIncome" ? Math.round(val).toLocaleString() : val;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        val -= cfg.step;
        if (val < cfg.min) val = cfg.min;
        input.value = cfg.id === "rentIncome" ? Math.round(val).toLocaleString() : val;
      }
    });

    input.addEventListener("input", () => {
      let num = parseFloat(input.value.replace(/[^0-9.]/g,''));
      if (isNaN(num)) return;
      if (cfg.id === "rentIncome") {
        input.value = Math.min(Math.max(num, cfg.min), cfg.max).toLocaleString();
      } else {
        input.value = Math.min(Math.max(num, cfg.min), cfg.max);
      }
    });
  });
}

/* =========================================
   MOBILE-ONLY STICKY CALCULATE BUTTON
========================================= */
function watchCalculateButton() {
  const mainBtn = document.getElementById("calculateBtn");
  const stickyBar = document.getElementById("stickyCalcBar");
  const stickyBtn = document.getElementById("stickyCalculateBtn");

  if (!mainBtn || !stickyBar) return;

  function check() {
    if (window.innerWidth > 768) {
      stickyBar.style.display = "none";
      return;
    }

    const rect = mainBtn.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      stickyBar.style.display = "block";
    } else {
      stickyBar.style.display = "none";
    }
  }

  window.addEventListener("scroll", check);
  window.addEventListener("resize", check);

  stickyBtn.addEventListener("click", () => mainBtn.click());
  check();
}

window.addEventListener("load", watchCalculateButton);


// 1️⃣ Define all calculators in one object
const calculators = {
  roi: {
    title: "ROI Calculator",
    description: "<p>Calculate total return versus investment.</p>",
    fields: [
      { label: "Total Investment", id: "roi-investment", type: "number" },
      { label: "Total Profit", id: "roi-profit", type: "number" }
    ],
    calculate: () => {
      const investment = Number(document.getElementById('roi-investment').value);
      const profit = Number(document.getElementById('roi-profit').value);
      const roi = (profit / investment) * 100;
      document.getElementById('calculator-results').innerHTML = `ROI: ${roi.toFixed(2)}%`;
    }
  },
  cash: {
    title: "Cash-on-Cash Calculator",
    description: "<p>Calculate Cash-on-Cash Return based on your cash investment.</p>",
    fields: [
      { label: "Cash Investment", id: "cash-investment", type: "number" },
      { label: "Annual Cash Flow", id: "annual-cash-flow", type: "number" }
    ],
    calculate: () => {
      const cashInvestment = Number(document.getElementById('cash-investment').value);
      const annualCashFlow = Number(document.getElementById('annual-cash-flow').value);
      const coc = (annualCashFlow / cashInvestment) * 100;
      document.getElementById('calculator-results').innerHTML = `Cash-on-Cash Return: ${coc.toFixed(2)}%`;
    }
  },
  capRate: {
    title: "Cap Rate Calculator",
    description: "<p>Calculate Capitalization Rate — return on property value ignoring financing.</p>",
    fields: [
      { label: "Net Operating Income (NOI)", id: "cap-noi", type: "number" },
      { label: "Property Value", id: "cap-value", type: "number" }
    ],
    calculate: () => {
      const noi = Number(document.getElementById('cap-noi').value);
      const value = Number(document.getElementById('cap-value').value);
      const capRate = (noi / value) * 100;
      document.getElementById('calculator-results').innerHTML = `Cap Rate: ${capRate.toFixed(2)}%`;
    }
  }
  // ... add the remaining calculators the same way
};

// 2️⃣ Elements
const titleEl = document.getElementById('calculator-title');
const descEl = document.getElementById('calculator-description');
const fieldsEl = document.getElementById('calculator-fields');
const resultsEl = document.getElementById('calculator-results');
const calcBtn = document.getElementById('calculate-btn');

// 3️⃣ Get calculator from URL
function getCalculatorFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('calc'); // e.g., ?calc=roi
}

// 4️⃣ Render calculator dynamically
function renderCalculator(calcKey) {
  const calc = calculators[calcKey] || calculators['roi']; // fallback
  document.title = calc.title;
  titleEl.textContent = calc.title;
  descEl.innerHTML = calc.description;

  // Generate input fields
  fieldsEl.innerHTML = "";
  calc.fields.forEach(f => {
    const label = document.createElement("label");
    label.textContent = f.label + ": ";
    const input = document.createElement("input");
    input.type = f.type;
    input.id = f.id;
    label.appendChild(input);
    fieldsEl.appendChild(label);
    fieldsEl.appendChild(document.createElement("br"));
  });

  resultsEl.innerHTML = "";
  calcBtn.onclick = () => calc.calculate();
}

// 5️⃣ On page load
const calcKey = getCalculatorFromURL();
renderCalculator(calcKey);

};
