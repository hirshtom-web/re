  // Make sure this runs after the page loads
  document.addEventListener("DOMContentLoaded", () => {
    fetch('articles.html')
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then(html => {
        // Insert the HTML into the container
        document.getElementById('articles-container').innerHTML = html;
      })
      .catch(error => {
        console.error("Failed to fetch articles:", error);
      });
  });
  

/* ---------------- CHART LOGIC ---------------- */
const svg = document.getElementById('stockChart');
const years = ["1Y","2Y","3Y","5Y","10Y"];
const mainFocusIndex = 3;

const performanceValues = {
    "1Y": "+4.23%",
    "2Y": "-2.87%",
    "3Y": "+6.44%",
    "5Y": "+18.92%",
    "10Y": "+32.15%"
};

function drawChart(){
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    const lineStart = 0;
    const lineEnd = width;

    const axisStart = width * 0.15;
    const axisEnd   = width * 0.85;
    const spacing = (axisEnd - axisStart) / (years.length - 1);

    const labelY = height - 30;

    const points = [
      {x: lineStart, y: height*0.65},
      {x: axisStart + spacing*0, y: height*0.64},
      {x: axisStart + spacing*1, y: height*0.75},
      {x: axisStart + spacing*2, y: height*0.72},
      {x: axisStart + spacing*3, y: height*0.65},
      {x: axisEnd, y: height*0.35},
      {x: lineEnd, y: height*0.32}
    ];

    const linePath = points.map((p,i)=> (i===0?'M':'L') + p.x + ',' + p.y).join('');
    svg.querySelector('.line').setAttribute('d', linePath);

    const areaPath = linePath + `L${lineEnd},${height} L${lineStart},${height} Z`;
    svg.querySelector('.area').setAttribute('d', areaPath);

    const xAxis = svg.querySelector('.x-axis');
    xAxis.innerHTML = "";

    years.forEach((year,i)=>{
        const x = axisStart + spacing*i;

        const el = document.createElementNS("http://www.w3.org/2000/svg","text");
        el.setAttribute("x", x);
        el.setAttribute("y", labelY);
        el.textContent = year;
        el.style.cursor = "pointer";

        el.setAttribute("fill", i === mainFocusIndex ? "#000" : "rgba(0,0,0,0.55)");
        el.setAttribute("font-weight", i === mainFocusIndex ? "700" : "500");

        el.addEventListener("click", ()=> updateSelection(year, x, labelY - 5));

        xAxis.appendChild(el);
    });

    updateSelection("5Y", axisStart + spacing*mainFocusIndex, labelY - 5);
}

function updateSelection(year, x, y){
    const circle = svg.querySelector('.highlight-circle');
    const bubble = document.getElementById('bubble');

    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);

    bubble.textContent = performanceValues[year];
}

window.addEventListener("resize", drawChart);
drawChart();

/* ---------------- MAP LOGIC ---------------- */
d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(topojsonData => {
  const states = topojson.feature(topojsonData, topojsonData.objects.states);
  const width = 960, height = 600;
  const svgMap = d3.select("#map-container").append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("width", "100%")
      .style("height", "auto");

  const projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(1000);

  const path = d3.geoPath().projection(projection);
  const tooltip = d3.select("#tooltip");

  svgMap.selectAll("path.state")
     .data(states.features)
     .enter()
     .append("path")
     .attr("class", "state")
     .attr("d", path)
     .on("mouseenter", (event, d) => {
        tooltip.html(d.properties.name).style("opacity", 1);
     })
     .on("mousemove", (event) => {
        tooltip.style("left", event.offsetX + 15 + "px")
               .style("top", event.offsetY - 10 + "px");
     })
     .on("mouseleave", () => {
        tooltip.style("opacity", 0);
     });
});

  // =========================================
// LOAD FOOTER
// =========================================


  // Load footer.html into #footer-container
  fetch('footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(err => console.error('Error loading footer:', err));

  // Load formulas.html into #formulas-container
  fetch('formulas.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('formulas-container').innerHTML = html;
    })
    .catch(err => console.error('Error loading formulas:', err));



// =========================================
// Top 200+ US cities for autocomplete
// =========================================
const topCities = [
  "New York, NY","Los Angeles, CA","Chicago, IL","Houston, TX","Phoenix, AZ",
  "Philadelphia, PA","San Antonio, TX","San Diego, CA","Dallas, TX","San Jose, CA",
  "Austin, TX","Jacksonville, FL","Fort Worth, TX","Columbus, OH","Charlotte, NC",
  "San Francisco, CA","Indianapolis, IN","Seattle, WA","Denver, CO","Washington, DC",
  "Boston, MA","El Paso, TX","Nashville, TN","Detroit, MI","Oklahoma City, OK",
  "Portland, OR","Las Vegas, NV","Memphis, TN","Louisville, KY","Baltimore, MD",
  "Milwaukee, WI","Albuquerque, NM","Tucson, AZ","Fresno, CA","Sacramento, CA",
  "Kansas City, MO","Long Beach, CA","Mesa, AZ","Atlanta, GA","Colorado Springs, CO",
  "Virginia Beach, VA","Raleigh, NC","Omaha, NE","Miami, FL","Oakland, CA",
  "Minneapolis, MN","Tulsa, OK","Wichita, KS","New Orleans, LA","Arlington, TX",
  // ... add remaining cities to reach 200+
];

// =========================================
// AUTOCOMPLETE FUNCTION
// =========================================
function autocomplete(inp, arr) {
  let currentFocus;

  inp.addEventListener("input", function() {
    let val = this.value;
    closeAllLists();
    if (!val) return false;
    currentFocus = -1;

    const listDiv = document.createElement("DIV");
    listDiv.setAttribute("id", this.id + "-autocomplete-list");
    listDiv.setAttribute("class", "autocomplete-items");
    listDiv.style.border = "1px solid #ccc";
    listDiv.style.borderTop = "none";
    listDiv.style.position = "absolute";
    listDiv.style.backgroundColor = "#fff";
    listDiv.style.zIndex = "99";
    listDiv.style.maxHeight = "200px";
    listDiv.style.overflowY = "auto";
    this.parentNode.appendChild(listDiv);

    arr.forEach(city => {
      if (city.toLowerCase().includes(val.toLowerCase())) {
        const item = document.createElement("DIV");
        item.innerHTML = city.replace(new RegExp(val, "i"), match => `<strong>${match}</strong>`);
        item.style.padding = "5px";
        item.style.cursor = "pointer";
        item.addEventListener("click", function() {
          inp.value = city;
          closeAllLists();
        });
        listDiv.appendChild(item);
      }
    });
  });

  inp.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "-autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) { // down
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) { // up
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) { // enter
      e.preventDefault();
      if (currentFocus > -1) if (x) x[currentFocus].click();
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
    x[currentFocus].style.backgroundColor = "#e9e9e9";
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
      x[i].style.backgroundColor = "#fff";
    }
  }

  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) x[i].parentNode.removeChild(x[i]);
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

// =========================================
// AUTO-DETECT LOCATION
// =========================================
function autoDetectLocation() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      let city = data.city || "";
      let state = data.region || "";
      if (city || state) {
        const marketInput = document.getElementById("marketLocation");
        marketInput.value = `${city}${city && state ? ", " : ""}${state}`;
        marketInput.dispatchEvent(new Event("input")); // triggers autocomplete suggestions
      }
    })
    .catch(err => console.warn("Location lookup failed:", err));
}

// Initialize
window.addEventListener("load", () => {
  autocomplete(document.getElementById("marketLocation"), topCities);
  autoDetectLocation();
});
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

    // Default values
    const defaultRent = 2350;
    const defaultApp = 9.2;

    // If no input, prompt user but let them continue
    if (!rentInput.value || !appInput.value) {
        const proceed = confirm(
            "No Rent or Appreciation Rate entered. We'll use average market values (Rent: $2,350, Appreciation: 9.2%) for best results. Continue?"
        );
        if (!proceed) return; // Stop calculation if user cancels
    }

    const rent = Number(rentInput.value.replace(/,/g, '')) || defaultRent;
    const appreciationRate = (Number(appInput.value.replace(/,/g, '')) || defaultApp) / 100;

    // ---------- Other inputs ----------
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

    // ---------- Base ROI ----------
    const totalRentCollected = rent * 12 * years;
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate, years);
    const appreciationGain = futureValue - purchasePrice;
    let baseROI = totalRentCollected + appreciationGain;

    // ---------- Financing ----------
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

    // ---------- Display & Chart ----------
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
   TABS
========================================= */
document.querySelectorAll('.tab-container .tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-container .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const contentEl = document.getElementById("tab-" + tab.dataset.tab);
        if (contentEl) contentEl.classList.add('active');
    });
});

/* =========================================
   TOOLTIP USING TITLE
========================================= */
document.querySelectorAll('.info').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.background = '#000';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = 1000;
        tooltip.innerText = el.title;
        document.body.appendChild(tooltip);

        const rect = el.getBoundingClientRect();
        tooltip.style.left = rect.left + window.scrollX + "px";
        tooltip.style.top = rect.bottom + window.scrollY + "px";

        el.addEventListener('mouseleave', () => tooltip.remove(), { once: true });
    });
});

/* =========================================
   PDF GENERATOR
========================================= */
function downloadPDF() {
    const agree = document.getElementById("disclaimerAgree");
    if (!agree.checked) {
        alert("Please accept the disclaimer to download the PDF.");
        return;
    }

    const element = document.getElementById('reportSection');
    if (!element) return;
    element.style.display = "block";

    html2canvas(element, { scale: 2 }).then(canvas => {
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = canvas.height * width / canvas.width;

        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
        pdf.save("Investment_Report.pdf");
        element.style.display = "none";
    });
}

function initSuggestedInputs() {
  const inputs = [
    { id: "rentIncome", min: 1, max: 999999, step: 1 },
    { id: "appreciationRate", min: 0.1, max: 99.9, step: 0.1 }
  ];

  inputs.forEach(cfg => {
    const input = document.getElementById(cfg.id);
    const suggest = Number(input.dataset.suggest);
    const popup = document.getElementById(cfg.id + "Suggestion");

    // Show popup on focus
    input.addEventListener("focus", () => {
      popup.style.display = "block";
      if (!input.value) input.value = suggest;
    });

    input.addEventListener("blur", () => {
      setTimeout(() => popup.style.display = "none", 200);
      if (Number(input.value) === suggest) input.value = ""; // restore placeholder
    });

    // Up/Down arrows
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

    // Input formatting
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

// =========================================
// MOBILE-ONLY STICKY CALCULATE BUTTON
// =========================================
function watchCalculateButton() {
  const mainBtn = document.getElementById("calculateBtn");
  const stickyBar = document.getElementById("stickyCalcBar");
  const stickyBtn = document.getElementById("stickyCalculateBtn");

  if (!mainBtn || !stickyBar) return;

  function check() {

    // 🚫 Desktop — always hide sticky bar
    if (window.innerWidth > 768) {
      stickyBar.style.display = "none";
      return;
    }

    // 📱 Mobile — show when main button is OUT of viewport
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

  check(); // Initial run
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
window.addEventListener("DOMContentLoaded", () => {
  const calcKey = getCalculatorFromURL();
  renderCalculator(calcKey);
});

document.addEventListener("DOMContentLoaded", () => {

  // EVERYTHING that uses the DOM goes here:
  drawChart();
  watchCalculateButton();
  activateAddExpense();
  autocomplete(document.getElementById("marketLocation"), topCities);
  autoDetectLocation();

  document.querySelectorAll('.tab-container .tab').forEach(tab => {
      tab.addEventListener('click', () => {
          document.querySelectorAll('.tab-container .tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

          tab.classList.add('active');
          const contentEl = document.getElementById("tab-" + tab.dataset.tab);
          if (contentEl) contentEl.classList.add('active');
      });
  });

  const calcKey = getCalculatorFromURL();
  renderCalculator(calcKey);

});
