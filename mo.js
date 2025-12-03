// ===============================
// 1️⃣ Define Calculators & Fields
// ===============================
const calculators = {
  roi: {
    title: "See your next real estate investment in numbers",
    subtitle: "Estimate cash flow, ROI, and leverage to make smarter property decisions",
    mandatoryFields: ["purchasePrice", "rentIncome"],
    // Keep the tab fields the same, just some can be optional/mandatory
    tabs: {
      "key-details": ["purchasePrice", "rentIncome", "appreciationRate", "yearsHold", "propertyType", "marketLocation"],
      "financing": ["downPaymentPercent", "cashInvestment", "loanAmount", "mortgageRate", "mortgageTerm"],
      "operating": ["taxes", "insurance", "hoa", "managementFees", "vacancyRate"]
    },
    calculate: (values) => {
      const purchase = Number(values.purchasePrice);
      const rent = Number(values.rentIncome);
      const years = Number(values.yearsHold);
      const appreciation = Number(values.appreciationRate);

      const totalRent = rent * 12 * years;
      const totalValue = purchase * (1 + appreciation/100)**years;
      const roi = ((totalRent + (totalValue - purchase)) / purchase * 100).toFixed(2);

      return { totalROI: roi };
    }
  },

  coc: {
    title: "Cash-on-Cash Return Calculator",
    subtitle: "See how your cash investment performs compared to rental income",
    mandatoryFields: ["cashInvestment", "annualCashFlow"],
    tabs: {
      "key-details": ["cashInvestment", "annualCashFlow"],
      "financing": ["downPaymentPercent", "loanAmount"],
      "operating": ["managementFees", "vacancyRate"]
    },
    calculate: (values) => {
      const cash = Number(values.cashInvestment);
      const flow = Number(values.annualCashFlow);
      const coc = ((flow / cash) * 100).toFixed(2);
      return { totalROI: coc };
    }
  }
};

// ===============================
// 2️⃣ Set Active Calculator
// ===============================
let activeCalculator = "roi";

// Update title/subtitle
function updateHeader(calcKey) {
  const calc = calculators[calcKey];
  document.querySelector(".title").innerText = calc.title;
  document.querySelector(".subtitle").innerText = calc.subtitle;
}

// ===============================
// 3️⃣ Mark mandatory fields per calculator
// ===============================
function markMandatory(calcKey) {
  const calc = calculators[calcKey];
  const allInputs = document.querySelectorAll("#calculator-fields input, #calculator-fields select");

  allInputs.forEach(input => {
    if(calc.mandatoryFields.includes(input.id)){
      input.required = true;
      input.style.borderColor = "#ff4d4f"; // highlight mandatory
    } else {
      input.required = false;
      input.style.borderColor = ""; // reset style
    }
  });
}

// ===============================
// 4️⃣ Calculate function
// ===============================
function calculateCurrent() {
  const calc = calculators[activeCalculator];
  const values = {};

  const allInputs = document.querySelectorAll("#calculator-fields input, #calculator-fields select");
  allInputs.forEach(input => {
    values[input.id] = input.value || 0;
  });

  // Check mandatory fields
  for(const fieldId of calc.mandatoryFields){
    if(!values[fieldId] || values[fieldId] === "0"){
      alert(`Please fill the mandatory field: ${fieldId}`);
      return;
    }
  }

  const result = calc.calculate(values);
  document.getElementById("resultTotalROILarge").innerText = `$${result.totalROI}`;
}

// ===============================
// 5️⃣ Handle calculator page switching
// ===============================
function switchCalculator(calcKey) {
  activeCalculator = calcKey;
  updateHeader(calcKey);
  markMandatory(calcKey);

  // Optionally, reset tab content inputs (keep tabs design)
  // Here we just keep current inputs and highlight mandatory
}

// ===============================
// 6️⃣ Event Listeners
// ===============================
document.getElementById("calculateBtn").addEventListener("click", calculateCurrent);
document.getElementById("stickyCalculateBtn").addEventListener("click", calculateCurrent);

// Example: switching calculators programmatically
// switchCalculator("coc");

// Optional: bind to tabs if you want
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    // keep tab functionality
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    // you can still map tab to calculator if desired
  });
});
