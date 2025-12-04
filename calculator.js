// =========================================
// MAIN SCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {


  // ---------------- LOAD FOOTER ----------------
  fetch('footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(err => console.error('Error loading footer:', err));

  // ---------------- LOAD FORMULAS ----------------
  fetch('formulas.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('formulas-container').innerHTML = html;
    })
    .catch(err => console.error('Error loading formulas:', err));

  // ---------------- CHART LOGIC ----------------
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
      if(!svg) return;
      const width = svg.clientWidth;
      const height = svg.clientHeight;

      const lineStart = 0;
      const lineEnd = width;

      const axisStart = width * 0.15;
      const axisEnd = width * 0.85;
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
      svg.querySelector('.line')?.setAttribute('d', linePath);

      const areaPath = linePath + `L${lineEnd},${height} L${lineStart},${height} Z`;
      svg.querySelector('.area')?.setAttribute('d', areaPath);

      const xAxis = svg.querySelector('.x-axis');
      if(xAxis){
          xAxis.innerHTML = "";
          years.forEach((year,i)=>{
              const x = axisStart + spacing*i;
              const el = document.createElementNS("http://www.w3.org/2000/svg","text");
              el.setAttribute("x", x);
              el.setAttribute("y", labelY);
              el.textContent = year;
              el.style.cursor = "pointer";
              el.setAttribute("fill", i===mainFocusIndex ? "#000" : "rgba(0,0,0,0.55)");
              el.setAttribute("font-weight", i===mainFocusIndex ? "700" : "500");
              el.addEventListener("click", ()=> updateSelection(year, x, labelY-5));
              xAxis.appendChild(el);
          });
          updateSelection("5Y", axisStart + spacing*mainFocusIndex, labelY-5);
      }
  }

  function updateSelection(year, x, y){
      const circle = svg.querySelector('.highlight-circle');
      const bubble = document.getElementById('bubble');
      if(circle){ circle.setAttribute('cx', x); circle.setAttribute('cy', y); }
      if(bubble){ bubble.textContent = performanceValues[year]; }
  }

  window.addEventListener("resize", drawChart);
  drawChart();

  // ---------------- MAP LOGIC ----------------
  if(document.getElementById("map-container") && window.d3 && window.topojson){
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(topojsonData => {
      const states = topojson.feature(topojsonData, topojsonData.objects.states);
      const width = 960, height = 600;
      const svgMap = d3.select("#map-container").append("svg")
        .attr("viewBox", [0, 0, width, height])
        .style("width", "100%").style("height", "auto");

      const projection = d3.geoAlbersUsa().translate([width/2, height/2]).scale(1000);
      const path = d3.geoPath().projection(projection);
      const tooltip = d3.select("#tooltip");

      svgMap.selectAll("path.state")
        .data(states.features)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("d", path)
        .on("mouseenter", (event,d)=> tooltip.html(d.properties.name).style("opacity",1))
        .on("mousemove", (event)=> tooltip.style("left", event.offsetX+15+"px").style("top", event.offsetY-10+"px"))
        .on("mouseleave", ()=> tooltip.style("opacity",0));
    }).catch(err=>console.error("Map load error:", err));
  }

  // ---------------- AUTOCOMPLETE ----------------
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
    "Minneapolis, MN","Tulsa, OK","Wichita, KS","New Orleans, LA","Arlington, TX"
    // ... add remaining cities as needed
  ];

  function autocomplete(inp, arr){
    let currentFocus;
    inp.addEventListener("input", function(){
      const val = this.value;
      closeAllLists();
      if(!val) return false;
      currentFocus = -1;
      const listDiv = document.createElement("DIV");
      listDiv.setAttribute("id", this.id+"-autocomplete-list");
      listDiv.setAttribute("class", "autocomplete-items");
      listDiv.style.cssText = "border:1px solid #ccc;border-top:none;position:absolute;background:#fff;z-index:99;max-height:200px;overflow-y:auto;";
      this.parentNode.appendChild(listDiv);
      arr.forEach(city=>{
        if(city.toLowerCase().includes(val.toLowerCase())){
          const item = document.createElement("DIV");
          item.innerHTML = city.replace(new RegExp(val,"i"), match=>`<strong>${match}</strong>`);
          item.style.padding="5px"; item.style.cursor="pointer";
          item.addEventListener("click", ()=>{ inp.value=city; closeAllLists(); });
          listDiv.appendChild(item);
        }
      });
    });

    inp.addEventListener("keydown", function(e){
      let x = document.getElementById(this.id+"-autocomplete-list");
      if(x) x = x.getElementsByTagName("div");
      if(e.keyCode == 40){ currentFocus++; addActive(x); }
      else if(e.keyCode == 38){ currentFocus--; addActive(x); }
      else if(e.keyCode == 13){ e.preventDefault(); if(currentFocus>-1 && x) x[currentFocus].click(); }
    });

    function addActive(x){ if(!x) return; removeActive(x); if(currentFocus>=x.length) currentFocus=0; if(currentFocus<0) currentFocus=x.length-1; x[currentFocus].classList.add("autocomplete-active"); x[currentFocus].style.background="#e9e9e9"; }
    function removeActive(x){ for(let i=0;i<x.length;i++){ x[i].classList.remove("autocomplete-active"); x[i].style.background="#fff"; } }
    function closeAllLists(elmnt){ const x=document.getElementsByClassName("autocomplete-items"); for(let i=0;i<x.length;i++){ if(elmnt!=x[i] && elmnt!=inp) x[i].parentNode.removeChild(x[i]); } }
    document.addEventListener("click", e=>closeAllLists(e.target));
  }

  function autoDetectLocation(){
    fetch("https://ipapi.co/json/")
      .then(res=>res.json())
      .then(data=>{
        const city = data.city || "";
        const state = data.region || "";
        if(city||state){
          const marketInput = document.getElementById("marketLocation");
          if(marketInput){ marketInput.value=`${city}${city&&state?", ":""}${state}`; marketInput.dispatchEvent(new Event("input")); }
        }
      })
      .catch(err=>console.warn("Location lookup failed:", err));
  }

  // Initialize autocomplete
  const marketInput = document.getElementById("marketLocation");
  if(marketInput){
    autocomplete(marketInput, topCities);
    autoDetectLocation();
  }

}); // End DOMContentLoaded

// =========================================
// FORMAT NUMBERS WITH COMMAS
// =========================================
function formatWithCommas(input){
  let value = input.value.replace(/[^\d]/g,'');
  input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

/* =========================================
   LOAD EXTERNAL HTML
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Articles
    fetch('articles.html')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(html => {
            document.getElementById('articles-container').innerHTML = html;
        })
        .catch(error => console.error("Failed to fetch articles:", error));

    // Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(html => document.getElementById('footer-container').innerHTML = html)
        .catch(err => console.error('Error loading footer:', err));

    // Formulas
    fetch('formulas.html')
        .then(response => response.text())
        .then(html => document.getElementById('formulas-container').innerHTML = html)
        .catch(err => console.error('Error loading formulas:', err));
});

/* =========================================
   CHART LOGIC
========================================= */
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
    svg.querySelector('.line')?.setAttribute('d', linePath);

    const areaPath = linePath + `L${lineEnd},${height} L${lineStart},${height} Z`;
    svg.querySelector('.area')?.setAttribute('d', areaPath);

    const xAxis = svg.querySelector('.x-axis');
    if (xAxis) xAxis.innerHTML = "";

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

        xAxis?.appendChild(el);
    });

    updateSelection("5Y", axisStart + spacing*mainFocusIndex, labelY - 5);
}

function updateSelection(year, x, y){
    const circle = svg.querySelector('.highlight-circle');
    const bubble = document.getElementById('bubble');

    if (circle) {
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
    }
    if (bubble) bubble.textContent = performanceValues[year];
}

window.addEventListener("resize", drawChart);
drawChart();

/* =========================================
   MAP LOGIC
========================================= */
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
     .on("mouseenter", (event, d) => tooltip.html(d.properties.name).style("opacity", 1))
     .on("mousemove", (event) => {
        tooltip.style("left", event.offsetX + 15 + "px")
               .style("top", event.offsetY - 10 + "px");
     })
     .on("mouseleave", () => tooltip.style("opacity", 0));
});

/* =========================================
   AUTOCOMPLETE AND LOCATION
========================================= */
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
  // add remaining cities
];

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
    if (e.keyCode == 40) { currentFocus++; addActive(x); }
    else if (e.keyCode == 38) { currentFocus--; addActive(x); }
    else if (e.keyCode == 13) { e.preventDefault(); if (currentFocus > -1) x[currentFocus].click(); }
  });

  function addActive(x) { if (!x) return false; removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
    x[currentFocus].style.backgroundColor = "#e9e9e9";
  }

  function removeActive(x) { for (let i=0;i<x.length;i++) { x[i].classList.remove("autocomplete-active"); x[i].style.backgroundColor="#fff"; } }

  function closeAllLists(elmnt) { const x=document.getElementsByClassName("autocomplete-items");
    for (let i=0;i<x.length;i++) if(elmnt!=x[i] && elmnt!=inp) x[i].parentNode.removeChild(x[i]);
  }

  document.addEventListener("click", function (e) { closeAllLists(e.target); });
}

function autoDetectLocation() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      let city = data.city || "";
      let state = data.region || "";
      if (city || state) {
        const marketInput = document.getElementById("marketLocation");
        marketInput.value = `${city}${city && state ? ", " : ""}${state}`;
        marketInput.dispatchEvent(new Event("input"));
      }
    })
    .catch(err => console.warn("Location lookup failed:", err));
}

/* =========================================
   NUMBER FORMATTING
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
    function frame(now){
        const progress = Math.min((now - startTime) / duration, 1);
        const value = start + range * progress;
        el.innerText = "$" + Math.floor(value).toLocaleString();
        if(progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

/* =========================================
   DYNAMIC EXPENSES
========================================= */
const expenseTypes = [
    "Repairs & Maintenance","Legal Fees","Vacancy Cost","Bookkeeping & Accounting","Bank Fees","Other"
];

function activateAddExpense() {
    const wrapper = document.getElementById("addExpenseWrapper");
    if(!wrapper) return;
    const addInput = document.getElementById("addExpenseInput");
    if(!addInput) return;

    addInput.onclick = () => {
        wrapper.innerHTML = "";
        const select = document.createElement("select");
        select.innerHTML = `<option value="">Select Expense</option>` +
            expenseTypes.map(t=>`<option value="${t}">${t}</option>`).join("");
        wrapper.appendChild(select);

        select.onchange = () => {
            if(!select.value) return;
            const row = document.createElement("div");
            row.className="input-group added-expense";
            row.innerHTML=`
                <label>${select.value}</label>
                <input type="text" class="expenseValue" placeholder="Amount">
                <button type="button" class="remove-btn">✕</button>
            `;
            row.querySelector(".expenseValue").oninput = e=>formatWithCommas(e.target);
            row.querySelector(".remove-btn").onclick = ()=>row.remove();

            wrapper.parentElement.insertBefore(row, wrapper);

            wrapper.innerHTML = `<label style="visibility:hidden;">Add Expense</label>
                <input type="text" id="addExpenseInput" placeholder="+ Add Expense" readonly style="cursor:pointer;">`;
            activateAddExpense();
        };
    };
}
activateAddExpense();

function calculateTotalExpenses() {
    let total = 0;
    document.querySelectorAll('.expenseValue').forEach(exp => {
        total += Number(exp.value.replace(/,/g,'')) || 0;
    });
    return total;
}

/* =========================================
   ROI CALCULATION AND CHART
========================================= */
let roiChart;
function renderROIChart(totalROI, cashFlow, NOI, coc) {
    const ctxEl = document.getElementById('roiChart');
    if(!ctxEl) return;
    const ctx = ctxEl.getContext('2d');
    if(roiChart) roiChart.destroy();
    roiChart = new Chart(ctx,{
        type:'bar',
        data:{labels:['Total ROI','Cash Flow','NOI','Cash-on-Cash'],
              datasets:[{data:[totalROI,cashFlow,NOI,coc],
                         backgroundColor:['#005bff','#00c851','#ffbb33','#ff4444']}]},
        options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}
    });
}

function calculateROI(){
    const rentInput = document.getElementById('rentIncome');
    const appInput = document.getElementById('appreciationRate');
    const defaultRent = 2350;
    const defaultApp = 9.2;

    if(!rentInput.value || !appInput.value){
        const proceed = confirm("No Rent or Appreciation Rate entered. We'll use average market values (Rent: $2,350, Appreciation: 9.2%) for best results. Continue?");
        if(!proceed) return;
    }

    const rent = Number(rentInput.value.replace(/,/g,'')) || defaultRent;
    const appreciationRate = (Number(appInput.value.replace(/,/g,'')) || defaultApp)/100;

    const getVal = id => Number(document.getElementById(id)?.value.replace(/,/g,'')) || 0;
    const purchasePrice = getVal('purchasePrice');
    const years = Number(document.getElementById('yearsHold')?.value) || 0;
    const cashInvestment = getVal('cashInvestment');
    const loan = getVal('loanAmount');
    const mortgageRateMonthly = ((Number(document.getElementById('mortgageRate')?.value)||0)/100)/12;
    const mortgageTermMonths = (Number(document.getElementById('mortgageTerm')?.value)||0)*12;
    const taxes = getVal('taxes');
    const insurance = getVal('insurance');
    const hoaAnnual = getVal('hoa')*12;
    const vacancyRate = (Number(document.getElementById('vacancyRate')?.value)||0)/100;
    const mgmtRate = (Number(document.getElementById('managementFees')?.value)||0)/100;
    const dynamicExpenses = calculateTotalExpenses();

    const totalRentCollected = rent*12*years;
    const futureValue = purchasePrice*Math.pow(1+appreciationRate,years);
    const appreciationGain = futureValue-purchasePrice;
    let baseROI = totalRentCollected+appreciationGain;

    let mortgagePayment=0;
    if(loan>0 && mortgageRateMonthly>0 && mortgageTermMonths>0){
        mortgagePayment = loan*(mortgageRateMonthly*Math.pow(1+mortgageRateMonthly,mortgageTermMonths))/
                          (Math.pow(1+mortgageRateMonthly,mortgageTermMonths)-1);
    }

    let mortgagePaidOff=0;
    if(loan>0 && mortgageRateMonthly>0 && years>0){
        mortgagePaidOff = loan - (loan*Math.pow(1+mortgageRateMonthly,mortgageTermMonths-years*12));
        mortgagePaidOff = mortgagePaidOff>0 ? mortgagePaidOff : 0;
    }

    const monthlyVacancyAdjustedRent = rent*(1-vacancyRate);
    const monthlyOperatingExpenses = (taxes+insurance+dynamicExpenses)/12+(hoaAnnual/12)+(rent*mgmtRate);
    const monthlyCashFlow = monthlyVacancyAdjustedRent-monthlyOperatingExpenses-mortgagePayment;
    const annualCashFlow = monthlyCashFlow*12;
    const NOI = (monthlyVacancyAdjustedRent*12)-(monthlyOperatingExpenses*12);
    const CoC = cashInvestment>0 ? (annualCashFlow/cashInvestment)*100 : 0;

    const totalExpenses = (monthlyOperatingExpenses+mortgagePayment)*12*years;
    const totalROI = purchasePrice+totalRentCollected+appreciationGain-totalExpenses+mortgagePaidOff;

    animateValue("resultTotalROILarge",0,totalROI,1000);
    document.getElementById("resultCashFlowColumn").innerText="Equity: $"+Math.floor(futureValue-loan).toLocaleString();
    document.getElementById("resultNOIColumn").innerText="Gain: $"+Math.floor(appreciationGain).toLocaleString();
    document.getElementById("resultCoCColumn").innerText="Total Rent: $"+Math.floor(totalRentCollected).toLocaleString();

    const capRate = purchasePrice ? (NOI/purchasePrice)*100 : 0;
    const annualYield = cashInvestment ? (annualCashFlow/cashInvestment)*100 :0;
    const totalOperatingExpenses = taxes+insurance+hoaAnnual+dynamicExpenses+(rent*mgmtRate);
    const expenseRatio = totalRentCollected ? (totalOperatingExpenses/totalRentCollected)*100:0;
    const DCR = mortgagePayment>0 ? (NOI/(mortgagePayment*12)) : 0;

    document.getElementById("capRateValue").innerText = capRate.toFixed(2)+"%";
    document.getElementById("yieldValue").innerText = annualYield.toFixed(2)+"%";
    document.getElementById("expenseRatioValue").innerText = expenseRatio.toFixed(2)+"%";
    document.getElementById("DCRValue").innerText = DCR.toFixed(2);

    renderROIChart(totalROI,annualCashFlow,NOI,CoC);
}

/* =========================================
   MOBILE STICKY BUTTONS
========================================= */
function setupStickyButtons() {
    const buyButton = document.getElementById("buyNowButton");
    if(!buyButton) return;
    const threshold = 300; //px
    window.addEventListener("scroll", ()=> {
        if(window.scrollY>threshold){
            buyButton.classList.add("visible");
        } else {
            buyButton.classList.remove("visible");
        }
    });
}
setupStickyButtons();

/* =========================================
   TABS
========================================= */
function setupTabs() {
    document.querySelectorAll(".tab-links button").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const parent = btn.closest(".tabs");
            parent.querySelectorAll(".tab-links button").forEach(b=>b.classList.remove("active"));
            parent.querySelectorAll(".tab-content").forEach(c=>c.style.display="none");
            btn.classList.add("active");
            const target = btn.getAttribute("data-target");
            parent.querySelector("#"+target).style.display="block";
        });
    });
}
setupTabs();

/* =========================================
   FORMAT INPUTS ON FOCUSOUT
========================================= */
document.querySelectorAll("input[data-type='currency']").forEach(input=>{
    input.addEventListener("blur", e=>formatWithCommas(e.target));
});

/* =========================================
   AUTOCOMPLETE INIT
========================================= */
const marketInput = document.getElementById("marketLocation");
if(marketInput){
    autocomplete(marketInput, topCities);
    autoDetectLocation();
}
