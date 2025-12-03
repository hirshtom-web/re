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
