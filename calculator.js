document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       HELPER FUNCTIONS
    ========================================== */
    function getNumber(id, defaultValue=0){
        const el = document.getElementById(id);
        return el ? Number(el.value.replace(/,/g,'')) || defaultValue : defaultValue;
    }

    function formatWithCommas(input){
        let value = input.value.replace(/[^\d]/g,'');
        input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

    function animateValue(id, start, end, duration){
        const el = document.getElementById(id);
        if(!el) return;
        const range = end - start;
        const startTime = performance.now();
        function frame(now){
            const progress = Math.min((now - startTime)/duration, 1);
            const value = start + range * progress;
            el.innerText = "$" + Math.floor(value).toLocaleString();
            if(progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function loadHTML(url, containerId){
        fetch(url)
            .then(res => res.text())
            .then(html => document.getElementById(containerId).innerHTML = html)
            .catch(err => console.error(`Error loading ${url}:`, err));
    }

    /* =========================================
       DYNAMIC PAGE TITLES
    ========================================== */
    const calculatorTitles = {
        "roi-calculator": {
            pageTitle: "ROI Calculator",
            pageDescription: "Quickly evaluate the long-term return on your rental property investment.",
            miniTitle: "See your next real estate investment in numbers",
            subtitle: "Estimate cash flow, ROI, and leverage to make smarter property decisions"
        },
        "mortgage-calculator": {
            pageTitle: "Mortgage Calculator",
            pageDescription: "Understand your mortgage costs, interest, and monthly payments.",
            miniTitle: "Understand your mortgage structure clearly",
            subtitle: "Estimate monthly payments and total loan cost with accurate amortization"
        },
        "airbnb-calculator": {
            pageTitle: "Airbnb Profit Calculator",
            pageDescription: "Calculate short-term rental revenue and actual hosting profits.",
            miniTitle: "Measure your short-term rental performance",
            subtitle: "Forecast occupancy, nightly revenue, and real hosting profits"
        },
        "expenses-calculator": {
            pageTitle: "Operating Expenses Calculator",
            pageDescription: "See a full breakdown of all recurring property-related expenses.",
            miniTitle: "Track every cost tied to your rental property",
            subtitle: "Include taxes, insurance, management, repairs, and vacancy impacts"
        },
        "financing-calculator": {
            pageTitle: "Financing Calculator",
            pageDescription: "Compare financing structures and loan types instantly.",
            miniTitle: "Compare financing structures instantly",
            subtitle: "Simulate down payment, interest rates, amortization and loan options"
        }
    };

    const page = window.location.pathname.split("/").pop().replace(".html","");
    const content = calculatorTitles[page];

    if(content){
        const titleEl = document.getElementById("page-title");
        const descEl = document.getElementById("page-description"); 
        const miniTitleEl = document.querySelector(".mini-title");
        const subtitleEl = document.querySelector(".subtitle");

        if(titleEl) titleEl.textContent = content.pageTitle;
        if(descEl) descEl.textContent = content.pageDescription;
        if(miniTitleEl) miniTitleEl.textContent = content.miniTitle;
        if(subtitleEl) subtitleEl.textContent = content.subtitle;
    }

    /* =========================================
       LOAD EXTERNAL HTML
    ========================================== */
    loadHTML('footer.html','footer-container');
    loadHTML('formulas.html','formulas-container');
    loadHTML('articles.html','articles-container');

    /* =========================================
       CALCULATOR BUTTON
    ========================================== */
    const calculateBtn = document.getElementById("calculateBtn");
    if(calculateBtn){
        calculateBtn.addEventListener("click", () => {
            switch(page){
                case "roi-calculator": calculateROI(); break;
                case "mortgage-calculator": calculateMortgage(); break;
                case "airbnb-calculator": calculateAirbnb(); break;
                case "expenses-calculator": calculateExpenses(); break;
                case "financing-calculator": calculateFinancing(); break;
                default: console.warn("No calculator defined for this page");
            }
        });
    }

    /* =========================================
       ROI CALCULATION
    ========================================== */
    let roiChart;
    function renderROIChart(totalROI, cashFlow, NOI, coc){
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

    function calculateTotalExpenses(){
        let total = 0;
        document.querySelectorAll('.expenseValue').forEach(exp => total += Number(exp.value.replace(/,/g,'')) || 0);
        return total;
    }

    function calculateROI(){
        const defaultRent = 2350;
        const defaultApp = 9.2;

        const rentInput = document.getElementById('rentIncome');
        const appInput = document.getElementById('appreciationRate');
        if(!rentInput.value || !appInput.value){
            const proceed = confirm(`No Rent or Appreciation Rate entered. We'll use average market values (Rent: $${defaultRent}, Appreciation: ${defaultApp}%) for best results. Continue?`);
            if(!proceed) return;
        }

        const rent = Number(rentInput.value.replace(/,/g,'')) || defaultRent;
        const appreciationRate = (Number(appInput.value.replace(/,/g,'')) || defaultApp)/100;

        const purchasePrice = getNumber('purchasePrice');
        const years = getNumber('yearsHold');
        const cashInvestment = getNumber('cashInvestment');
        const loan = getNumber('loanAmount');
        const mortgageRateMonthly = getNumber('mortgageRate')/100/12;
        const mortgageTermMonths = getNumber('mortgageTerm')*12;
        const taxes = getNumber('taxes');
        const insurance = getNumber('insurance');
        const hoaAnnual = getNumber('hoa')*12;
        const vacancyRate = getNumber('vacancyRate')/100;
        const mgmtRate = getNumber('managementFees')/100;
        const dynamicExpenses = calculateTotalExpenses();

        const totalRentCollected = rent*12*years;
        const futureValue = purchasePrice*Math.pow(1+appreciationRate,years);
        const appreciationGain = futureValue-purchasePrice;

        let mortgagePayment = 0;
        if(loan && mortgageRateMonthly && mortgageTermMonths)
            mortgagePayment = loan*(mortgageRateMonthly*Math.pow(1+mortgageRateMonthly,mortgageTermMonths))/
                              (Math.pow(1+mortgageRateMonthly,mortgageTermMonths)-1);

        let mortgagePaidOff = 0;
        if(loan && mortgageRateMonthly && years)
            mortgagePaidOff = Math.max(loan - (loan*Math.pow(1+mortgageRateMonthly,mortgageTermMonths-years*12)),0);

        const monthlyVacancyAdjustedRent = rent*(1-vacancyRate);
        const monthlyOperatingExpenses = (taxes+insurance+dynamicExpenses)/12 + (hoaAnnual/12) + (rent*mgmtRate);
        const monthlyCashFlow = monthlyVacancyAdjustedRent - monthlyOperatingExpenses - mortgagePayment;
        const annualCashFlow = monthlyCashFlow*12;
        const NOI = (monthlyVacancyAdjustedRent*12) - (monthlyOperatingExpenses*12);
        const CoC = cashInvestment>0 ? (annualCashFlow/cashInvestment)*100 : 0;

        const totalExpenses = (monthlyOperatingExpenses+mortgagePayment)*12*years;
        const totalROI = purchasePrice + totalRentCollected + appreciationGain - totalExpenses + mortgagePaidOff;

        animateValue("resultTotalROILarge",0,totalROI,1000);
        document.getElementById("resultCashFlowColumn").innerText = "Equity: $"+Math.floor(futureValue-loan).toLocaleString();
        document.getElementById("resultNOIColumn").innerText = "Gain: $"+Math.floor(appreciationGain).toLocaleString();
        document.getElementById("resultCoCColumn").innerText = "Total Rent: $"+Math.floor(totalRentCollected).toLocaleString();

        const capRate = purchasePrice ? (NOI/purchasePrice)*100 : 0;
        const annualYield = cashInvestment ? (annualCashFlow/cashInvestment)*100 :0;
        const totalOperatingExpenses = taxes + insurance + hoaAnnual + dynamicExpenses + (rent*mgmtRate);
        const expenseRatio = totalRentCollected ? (totalOperatingExpenses/totalRentCollected)*100:0;
        const DCR = mortgagePayment ? (NOI/(mortgagePayment*12)) : 0;

        document.getElementById("capRateValue").innerText = capRate.toFixed(2)+"%";
        document.getElementById("yieldValue").innerText = annualYield.toFixed(2)+"%";
        document.getElementById("expenseRatioValue").innerText = expenseRatio.toFixed(2)+"%";
        document.getElementById("DCRValue").innerText = DCR.toFixed(2);

        renderROIChart(totalROI,annualCashFlow,NOI,CoC);
    }

    /* =========================================
       CHART LOGIC
    ========================================== */
    const svgChart = document.getElementById('stockChart');
    const yearsChart = ["1Y","2Y","3Y","5Y","10Y"];
    const mainFocusIndex = 3;
    const performanceValues = {"1Y":"+4.23%","2Y":"-2.87%","3Y":"+6.44%","5Y":"+18.92%","10Y":"+32.15%"};

    function drawChart(){
        if(!svgChart) return;
        const width = svgChart.clientWidth;
        const height = svgChart.clientHeight;

        const lineStart = 0, lineEnd = width;
        const axisStart = width*0.15, axisEnd = width*0.85;
        const spacing = (axisEnd-axisStart)/(yearsChart.length-1);
        const labelY = height-30;

        const points = [
            {x: lineStart, y: height*0.65},
            {x: axisStart + spacing*0, y: height*0.64},
            {x: axisStart + spacing*1, y: height*0.75},
            {x: axisStart + spacing*2, y: height*0.72},
            {x: axisStart + spacing*3, y: height*0.65},
            {x: axisEnd, y: height*0.35},
            {x: lineEnd, y: height*0.32}
        ];

        const linePath = points.map((p,i)=> (i===0?'M':'L')+p.x+','+p.y).join('');
        svgChart.querySelector('.line')?.setAttribute('d',linePath);
        svgChart.querySelector('.area')?.setAttribute('d', linePath+`L${lineEnd},${height} L${lineStart},${height} Z`);

        const xAxis = svgChart.querySelector('.x-axis');
        if(xAxis) xAxis.innerHTML = "";
        yearsChart.forEach((year,i)=>{
            const x = axisStart + spacing*i;
            const el = document.createElementNS("http://www.w3.org/2000/svg","text");
            el.setAttribute("x",x); el.setAttribute("y",labelY); el.textContent = year;
            el.style.cursor = "pointer";
            el.setAttribute("fill", i===mainFocusIndex ? "#000" : "rgba(0,0,0,0.55)");
            el.setAttribute("font-weight", i===mainFocusIndex ? "700":"500");
            el.addEventListener("click", ()=> updateSelection(year, x, labelY-5));
            xAxis.appendChild(el);
        });
        updateSelection("5Y", axisStart+spacing*mainFocusIndex, labelY-5);
    }

    function updateSelection(year,x,y){
        const circle = svgChart.querySelector('.highlight-circle');
        const bubble = document.getElementById('bubble');
        if(circle){ circle.setAttribute('cx',x); circle.setAttribute('cy',y); }
        if(bubble){ bubble.textContent = performanceValues[year]; }
    }

    window.addEventListener("resize", drawChart);
    drawChart();

    /* =========================================
       MAP LOGIC
    ========================================== */
    if(document.getElementById("map-container") && window.d3 && window.topojson){
        d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(topojsonData=>{
            const states = topojson.feature(topojsonData, topojsonData.objects.states);
            const width = 960, height = 600;
            const svgMap = d3.select("#map-container").append("svg")
                .attr("viewBox",[0,0,width,height]).style("width","100%").style("height","auto");
            const projection = d3.geoAlbersUsa().translate([width/2,height/2]).scale(1000);
            const path = d3.geoPath().projection(projection);
            const tooltip = d3.select("#tooltip");

            svgMap.selectAll("path.state")
                .data(states.features)
                .enter()
                .append("path")
                .attr("class","state")
                .attr("d",path)
                .on("mouseenter",(event,d)=>tooltip.html(d.properties.name).style("opacity",1))
                .on("mousemove",(event)=>tooltip.style("left",event.offsetX+15+"px").style("top",event.offsetY-10+"px"))
                .on("mouseleave",()=>tooltip.style("opacity",0));
        }).catch(err=>console.error("Map load error:",err));
    }

    /* =========================================
       AUTOCOMPLETE & LOCATION
    ========================================== */
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
    ];

    function autocomplete(inp, arr){
        let currentFocus;
        inp.addEventListener("input", function(){
            let val = this.value;
            closeAllLists();
            if(!val) return false;
            currentFocus=-1;
            const listDiv=document.createElement("DIV");
            listDiv.setAttribute("id", this.id+"-autocomplete-list");
            listDiv.setAttribute("class","autocomplete-items");
            listDiv.style.cssText="border:1px solid #ccc;border-top:none;position:absolute;background:#fff;z-index:99;max-height:200px;overflow-y:auto;";
            this.parentNode.appendChild(listDiv);
            arr.forEach(city=>{
                if(city.toLowerCase().includes(val.toLowerCase())){
                    const item=document.createElement("DIV");
                    item.innerHTML = city.replace(new RegExp(val,"i"),match=>`<strong>${match}</strong>`);
                    item.style.padding="5px"; item.style.cursor="pointer";
                    item.addEventListener("click", ()=>{ inp.value=city; closeAllLists(); });
                    listDiv.appendChild(item);
                }
            });
        });

        inp.addEventListener("keydown",function(e){
            let x = document.getElementById(this.id+"-autocomplete-list");
            if(x) x=x.getElementsByTagName("div");
            if(e.keyCode==40){ currentFocus++; addActive(x); }
            else if(e.keyCode==38){ currentFocus--; addActive(x); }
            else if(e.keyCode==13){ e.preventDefault(); if(currentFocus>-1 && x) x[currentFocus].click(); }
        });

        function addActive(x){ if(!x) return false; removeActive(x); if(currentFocus>=x.length) currentFocus=0; if(currentFocus<0) currentFocus=x.length-1; x[currentFocus].classList.add("autocomplete-active"); x[currentFocus].style.background="#e9e9e9"; }
        function removeActive(x){ for(let i=0;i<x.length;i++){ x[i].classList.remove("autocomplete-active"); x[i].style.background="#fff"; } }
        function closeAllLists(elmnt){ const x=document.getElementsByClassName("autocomplete-items"); for(let i=0;i<x.length;i++){ if(elmnt!=x[i] && elmnt!=inp) x[i].parentNode.removeChild(x[i]); } }
        document.addEventListener("click", e=>closeAllLists(e.target));
    }

    function autoDetectLocation(){
        const marketInput = document.getElementById('market');
        if(!marketInput || !navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(position=>{
            const lat=position.coords.latitude;
            const lon=position.coords.longitude;
            fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`)
                .then(res=>res.json())
                .then(data=>{ if(data && data.address) marketInput.value = `${data.address.city || data.address.town || data.address.village}, ${data.address.state}`; })
                .catch(err=>console.error("Geocode error:",err));
        });
    }

    const marketInput = document.getElementById('market');
    if(marketInput){
        autocomplete(marketInput, topCities);
        autoDetectLocation();
    }

    /* =========================================
       DYNAMIC EXPENSE INPUT
    ========================================== */
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    if(addExpenseBtn){
        addExpenseBtn.addEventListener("click", ()=>{
            const container = document.getElementById("dynamicExpensesContainer");
            if(!container) return;
            const div = document.createElement("div");
            div.classList.add("expense-item");
            div.innerHTML = `<input type="text" class="expenseValue" placeholder="Amount"> <button type="button" class="remove-expense">Remove</button>`;
            container.appendChild(div);
            div.querySelector(".expenseValue").addEventListener("blur", e=>formatWithCommas(e.target));
            div.querySelector(".remove-expense").addEventListener("click", ()=>div.remove());
        });
    }

    /* =========================================
       STICKY MOBILE BUTTONS
    ========================================== */
    const stickyBtns = document.getElementById("stickyButtons");
    if(stickyBtns){
        window.addEventListener("scroll", ()=>{
            stickyBtns.style.display = window.scrollY > 300 ? "flex" : "none";
        });
    }

    /* =========================================
       TABS
    ========================================== */
    document.querySelectorAll('.tab-buttons button').forEach(button=>{
        button.addEventListener("click",()=>{
            const parent = button.closest('.tabs');
            parent.querySelectorAll('.tab-content').forEach(c=>c.style.display="none");
            parent.querySelectorAll('.tab-buttons button').forEach(b=>b.classList.remove('active'));
            const target = document.getElementById(button.dataset.tabTarget);
            if(target) target.style.display="block";
            button.classList.add('active');
        });
    });

    /* =========================================
       INPUT FORMATTING ON BLUR
    ========================================== */
    document.querySelectorAll('.number-input').forEach(input=>{
        input.addEventListener('blur', ()=>formatWithCommas(input));
    });

    /* =========================================
       PLACEHOLDER FUNCTIONS FOR OTHER CALCULATORS
    ========================================== */
    function calculateMortgage(){ console.log("Mortgage calculator triggered"); }
    function calculateAirbnb(){ console.log("Airbnb calculator triggered"); }
    function calculateExpenses(){ console.log("Expenses calculator triggered"); }
    function calculateFinancing(){ console.log("Financing calculator triggered"); }

});
