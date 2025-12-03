document.addEventListener("DOMContentLoaded", () => {

/* ============================================================
   FETCH: ARTICLES, FOOTER, FORMULAS
============================================================ */
function loadPartials() {
  const loads = [
    { id: "articles-container", file: "articles.html" },
    { id: "footer-container", file: "footer.html" },
    { id: "formulas-container", file: "formulas.html" }
  ];

  loads.forEach(section => {
    const el = document.getElementById(section.id);
    if (!el) return;

    fetch(section.file)
      .then(res => res.text())
      .then(html => el.innerHTML = html)
      .catch(err => console.error(`Error loading ${section.file}:`, err));
  });
}
loadPartials();


/* ============================================================
   CHART LOGIC
============================================================ */
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
  if (!svg) return;
  const width = svg.clientWidth;
  const height = svg.clientHeight;

  const linePath = `M0,${height*0.65} L${width*0.2},${height*0.6} L${width*0.4},${height*0.7}
                    L${width*0.6},${height*0.62} L${width*0.8},${height*0.35} L${width},${height*0.32}`;

  svg.querySelector('.line').setAttribute('d', linePath);
  svg.querySelector('.area').setAttribute(
    'd',
    `${linePath} L${width},${height} L0,${height} Z`
  );

  const xAxis = svg.querySelector('.x-axis');
  xAxis.innerHTML = "";

  const spacing = width * 0.7 / (years.length - 1);
  const startX = width * 0.15;
  const labelY = height - 30;

  years.forEach((yr, i) => {
    const text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x", startX + i * spacing);
    text.setAttribute("y", labelY);
    text.textContent = yr;

    if (i === mainFocusIndex) {
      text.setAttribute("fill", "#000");
      text.setAttribute("font-weight", "700");
    } else {
      text.setAttribute("fill", "rgba(0,0,0,0.55)");
      text.setAttribute("font-weight", "500");
    }

    text.style.cursor = "pointer";
    text.addEventListener("click", () => updateSelection(yr, startX + i * spacing, labelY - 5));
    xAxis.appendChild(text);
  });

  updateSelection("5Y", startX + spacing * mainFocusIndex, labelY - 5);
}

function updateSelection(year, x, y){
  if (!svg) return;
  svg.querySelector('.highlight-circle').setAttribute('cx', x);
  svg.querySelector('.highlight-circle').setAttribute('cy', y);
  const bubble = document.getElementById('bubble');
  if (bubble) bubble.textContent = performanceValues[year];
}

window.addEventListener("resize", drawChart);
drawChart();


/* ============================================================
   MAP LOGIC
============================================================ */
if (window.d3) {
  d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
    .then(topoData => {
      const states = topojson.feature(topoData, topoData.objects.states);
      const width = 960, height = 600;

      const svgMap = d3.select("#map-container").append("svg")
        .attr("viewBox", [0,0,width,height])
        .style("width","100%")
        .style("height","auto");

      const projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale(1000);

      const path = d3.geoPath().projection(projection);

      const tooltip = d3.select("#tooltip");

      svgMap.selectAll("path.state")
        .data(states.features)
        .enter()
        .append("path")
        .attr("class","state")
        .attr("d", path)
        .on("mouseenter", (event,d) => {
          tooltip.html(d.properties.name).style("opacity",1);
        })
        .on("mousemove", event => {
          tooltip.style("left", event.offsetX+15+"px");
          tooltip.style("top", event.offsetY-10+"px");
        })
        .on("mouseleave", () => tooltip.style("opacity",0));
    });
}


/* ============================================================
   AUTOCOMPLETE + LOCATION DETECTION
============================================================ */
const topCities = [... your cities list ...]; // shortened for clarity

function autocomplete(inp, arr) { /* unchanged code */ }
function autoDetectLocation() { /* unchanged code */ }

const marketInput = document.getElementById("marketLocation");
if (marketInput) {
  autocomplete(marketInput, topCities);
  autoDetectLocation();
}


/* ============================================================
   FORMAT WITH COMMAS
============================================================ */
function formatWithCommas(input) {
  let value = input.value.replace(/[^\d]/g, '');
  input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/* ============================================================
   EXPENSES ADDITION
============================================================ */
const expenseTypes = [
  "Repairs & Maintenance","Legal Fees","Vacancy Cost",
  "Bookkeeping","Bank Fees","Other"
];

function activateAddExpense() { /* unchanged code */ }
activateAddExpense();

function calculateTotalExpenses() {
  let total = 0;
  document.querySelectorAll(".expenseValue").forEach(i => {
    total += Number(i.value.replace(/,/g,"")) || 0;
  });
  return total;
}


/* ============================================================
   ROI CHART (Chart.js)
============================================================ */
let roiChart;
function renderROIChart(totalROI, cashFlow, NOI, coc) { /* unchanged code */ }


/* ============================================================
   CALCULATOR ENGINE (ROI / CoC / Cap Rate)
============================================================ */
const calculators = {
  roi: { /* same as before */ },
  coc: { /* same as before */ },
  capRate: { /* same as before */ }
};

let activeCalculator = "roi";

function renderCalculator(calcKey) { /* unchanged code */ }
function highlightMandatory(calcKey){ /* unchanged code */ }
function collectValues(){ /* unchanged code */ }
function calculateCurrent(){ /* unchanged code */ }
function switchCalculator(calcKey){ activeCalculator = calcKey; renderCalculator(calcKey); }


// INIT CALCULATOR
renderCalculator(activeCalculator);


/* ============================================================
   BIND CALCULATE BUTTONS
============================================================ */
const calcBtn = document.getElementById("calculateBtn");
const stickyCalcBtn = document.getElementById("stickyCalculateBtn");

if (calcBtn) calcBtn.addEventListener("click", calculateCurrent);
if (stickyCalcBtn) stickyCalcBtn.addEventListener("click", calculateCurrent);


/* ============================================================
   STICKY MOBILE CALCULATE BUTTON
============================================================ */
function watchCalculateButton() { /* unchanged code */ }
watchCalculateButton();


/* ============================================================
   TABS
============================================================ */
document.querySelectorAll(".tab-container .tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById("tab-" + tab.dataset.tab)?.classList.add("active");
  });
});


/* ============================================================
   TOOLTIP SYSTEM
============================================================ */
document.querySelectorAll(".info").forEach(el => {
  el.addEventListener("mouseenter", () => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.background = "#000";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "4px 8px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.fontSize = "12px";
    tooltip.style.zIndex = "1000";
    tooltip.innerText = el.title;

    document.body.appendChild(tooltip);

    const rect = el.getBoundingClientRect();
    tooltip.style.left = rect.left + "px";
    tooltip.style.top = rect.bottom + "px";

    el.addEventListener("mouseleave", () => tooltip.remove(), { once: true });
  });
});


/* ============================================================
   PDF GENERATION
============================================================ */
function downloadPDF(){ /* unchanged code */ }


/* ============================================================
   ARROW-UP/DOWN SMART INPUT HANDLERS
============================================================ */
function initSuggestedInputs(){ /* unchanged code */ }
initSuggestedInputs();


}); // END DOMContentLoaded
