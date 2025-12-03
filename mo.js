// ===============================
// 1️⃣ Define Calculators & Fields
// ===============================
const calculators = {
  roi: {
    title: "ROI Calculator",
    fields: [
      { id: "purchasePrice", label: "Purchase Price ($)", type: "number", placeholder: "500000" },
      { id: "rentIncome", label: "Monthly Rent ($)", type: "number", placeholder: "2350" },
      { id: "appreciationRate", label: "Appreciation Rate (%)", type: "number", placeholder: "9.2" },
      { id: "yearsHold", label: "Years to Hold", type: "select", options: [1,3,5,7,10,15] }
    ],
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

  cashOnCash: {
    title: "Cash-on-Cash Return",
    fields: [
      { id: "cashInvestment", label: "Cash Investment ($)", type: "number", placeholder: "150000" },
      { id: "annualCashFlow", label: "Annual Cash Flow ($)", type: "number", placeholder: "15000" }
    ],
    calculate: (values) => {
      const cash = Number(values.cashInvestment);
      const flow = Number(values.annualCashFlow);
      const coc = ((flow / cash) * 100).toFixed(2);
      return { totalROI: coc };
    }
  }
};

// ===============================
// 2️⃣ Render Fields Dynamically
// ===============================
function renderCalculator(calcKey) {
  const calc = calculators[calcKey];
  const container = document.getElementById("calculator-fields");
  container.innerHTML = ""; // Clear existing fields

  // Update calculator title
  document.getElementById("calculator-title").innerText = calc.title;

  // Create each input dynamically
  calc.fields.forEach(field => {
    const group = document.createElement("div");
    group.className = "input-group";

    const label = document.createElement("label");
    label.innerText = field.label;
    group.appendChild(label);

    let input;
    if (field.type === "select") {
      input = document.createElement("select");
      field.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.text = opt;
        input.appendChild(option);
      });
    } else {
      input = document.createElement("input");
      input.type = field.type;
      input.placeholder = field.placeholder || "";
    }
    input.id = field.id;
    group.appendChild(input);

    container.appendChild(group);
  });
}

// ===============================
// 3️⃣ Calculate Results
// ===============================
function calculateDynamic(calcKey) {
  const calc = calculators[calcKey];
  const values = {};

  calc.fields.forEach(field => {
    values[field.id] = document.getElementById(field.id).value || 0;
  });

  const result = calc.calculate(values);

  // Display results
  document.getElementById("resultTotalROILarge").innerText = `$${result.totalROI}`;
}

// ===============================
// 4️⃣ Tab Switching Logic
// ===============================
let activeCalculator = "roi"; // default

// Render default calculator
renderCalculator(activeCalculator);

// Bind calculate buttons
document.getElementById("calculateBtn").onclick = () => calculateDynamic(activeCalculator);
document.getElementById("stickyCalculateBtn").onclick = () => calculateDynamic(activeCalculator);

// Tab click handling (optional integration with your tabs)
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const tabType = tab.dataset.tab;

    // Map tabType to calculator
    if(tabType === "key-details") activeCalculator = "roi";
    if(tabType === "financing") activeCalculator = "cashOnCash";
    // Add more mappings if you have more calculators

    renderCalculator(activeCalculator);
  });
});

