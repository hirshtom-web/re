const calculators = {

  // 1️⃣ Cash Flow Calculator
  cashFlow: {
    title: "Cash Flow Calculator",
    description: "<p>Calculate monthly or annual net cash flow after all expenses and mortgage payments.</p>",
    fields: `
      <label>Rental Income: <input type="number" id="cf-rent" /></label><br/>
      <label>Operating Expenses: <input type="number" id="cf-expenses" /></label><br/>
      <label>Mortgage Payment: <input type="number" id="cf-mortgage" /></label>
    `,
    calculate: () => {
      const rent = Number(document.getElementById('cf-rent').value);
      const expenses = Number(document.getElementById('cf-expenses').value);
      const mortgage = Number(document.getElementById('cf-mortgage').value);
      const cashFlow = rent - expenses - mortgage;
      document.getElementById('calculator-results').innerHTML = `Net Cash Flow: $${cashFlow.toFixed(2)}`;
    }
  },

  // 2️⃣ Cash-on-Cash Return
  cash: {
    title: "Cash-on-Cash Calculator",
    description: "<p>Calculate Cash-on-Cash Return based on your cash investment.</p>",
    fields: `
      <label>Cash Investment: <input type="number" id="cash-investment" /></label><br/>
      <label>Annual Cash Flow: <input type="number" id="annual-cash-flow" /></label>
    `,
    calculate: () => {
      const cashInvestment = Number(document.getElementById('cash-investment').value);
      const annualCashFlow = Number(document.getElementById('annual-cash-flow').value);
      const coc = (annualCashFlow / cashInvestment) * 100;
      document.getElementById('calculator-results').innerHTML = `Cash-on-Cash Return: ${coc.toFixed(2)}%`;
    }
  },

  // 3️⃣ Cap Rate Calculator
  capRate: {
    title: "Cap Rate Calculator",
    description: "<p>Calculate Capitalization Rate — return on property value ignoring financing.</p>",
    fields: `
      <label>Net Operating Income (NOI): <input type="number" id="cap-noi" /></label><br/>
      <label>Property Value: <input type="number" id="cap-value" /></label>
    `,
    calculate: () => {
      const noi = Number(document.getElementById('cap-noi').value);
      const value = Number(document.getElementById('cap-value').value);
      const capRate = (noi / value) * 100;
      document.getElementById('calculator-results').innerHTML = `Cap Rate: ${capRate.toFixed(2)}%`;
    }
  },

  // 4️⃣ Gross Rent Multiplier (GRM)
  grm: {
    title: "Gross Rent Multiplier (GRM)",
    description: "<p>Quick estimate of property value relative to annual rent.</p>",
    fields: `
      <label>Property Price: <input type="number" id="grm-price" /></label><br/>
      <label>Annual Rent Income: <input type="number" id="grm-rent" /></label>
    `,
    calculate: () => {
      const price = Number(document.getElementById('grm-price').value);
      const rent = Number(document.getElementById('grm-rent').value);
      const grm = price / rent;
      document.getElementById('calculator-results').innerHTML = `GRM: ${grm.toFixed(2)}`;
    }
  },

  // 5️⃣ Mortgage Payment Calculator
  mortgage: {
    title: "Mortgage Payment Calculator",
    description: "<p>Calculate monthly mortgage payments based on loan amount, interest, and term.</p>",
    fields: `
      <label>Loan Amount: <input type="number" id="mortgage-loan" /></label><br/>
      <label>Annual Interest Rate (%): <input type="number" id="mortgage-rate" /></label><br/>
      <label>Term (Years): <input type="number" id="mortgage-term" /></label>
    `,
    calculate: () => {
      const P = Number(document.getElementById('mortgage-loan').value);
      const r = Number(document.getElementById('mortgage-rate').value) / 100 / 12;
      const n = Number(document.getElementById('mortgage-term').value) * 12;
      const payment = P * r / (1 - Math.pow(1 + r, -n));
      document.getElementById('calculator-results').innerHTML = `Monthly Payment: $${payment.toFixed(2)}`;
    }
  },

  // 6️⃣ Break-even Calculator
  breakEven: {
    title: "Break-even Calculator",
    description: "<p>Calculate when rental income covers all expenses.</p>",
    fields: `
      <label>Monthly Expenses: <input type="number" id="be-expenses" /></label><br/>
      <label>Monthly Rent: <input type="number" id="be-rent" /></label>
    `,
    calculate: () => {
      const expenses = Number(document.getElementById('be-expenses').value);
      const rent = Number(document.getElementById('be-rent').value);
      const units = Math.ceil(expenses / rent);
      document.getElementById('calculator-results').innerHTML = `Break-even Units: ${units}`;
    }
  },

  // 7️⃣ ROI (Return on Investment)
  roi: {
    title: "ROI Calculator",
    description: "<p>Calculate total return versus investment.</p>",
    fields: `
      <label>Total Investment: <input type="number" id="roi-investment" /></label><br/>
      <label>Total Profit: <input type="number" id="roi-profit" /></label>
    `,
    calculate: () => {
      const investment = Number(document.getElementById('roi-investment').value);
      const profit = Number(document.getElementById('roi-profit').value);
      const roi = (profit / investment) * 100;
      document.getElementById('calculator-results').innerHTML = `ROI: ${roi.toFixed(2)}%`;
    }
  },

  // 8️⃣ Net Operating Income (NOI)
  noi: {
    title: "Net Operating Income (NOI)",
    description: "<p>Income after operating expenses but before financing.</p>",
    fields: `
      <label>Gross Rental Income: <input type="number" id="noi-income" /></label><br/>
      <label>Operating Expenses: <input type="number" id="noi-expenses" /></label>
    `,
    calculate: () => {
      const income = Number(document.getElementById('noi-income').value);
      const expenses = Number(document.getElementById('noi-expenses').value);
      const noi = income - expenses;
      document.getElementById('calculator-results').innerHTML = `NOI: $${noi.toFixed(2)}`;
    }
  },

  // 9️⃣ Debt Service Coverage Ratio (DSCR)
  dscr: {
    title: "Debt Service Coverage Ratio",
    description: "<p>Measures ability to cover debt with net operating income.</p>",
    fields: `
      <label>NOI: <input type="number" id="dscr-noi" /></label><br/>
      <label>Debt Service (Annual Mortgage Payments): <input type="number" id="dscr-debt" /></label>
    `,
    calculate: () => {
      const noi = Number(document.getElementById('dscr-noi').value);
      const debt = Number(document.getElementById('dscr-debt').value);
      const ratio = noi / debt;
      document.getElementById('calculator-results').innerHTML = `DSCR: ${ratio.toFixed(2)}`;
    }
  },

  // 10️⃣ Price-to-Rent Ratio
  priceToRent: {
    title: "Price-to-Rent Ratio",
    description: "<p>Compare buying vs renting a property.</p>",
    fields: `
      <label>Property Price: <input type="number" id="pricerent-price" /></label><br/>
      <label>Annual Rent: <input type="number" id="pricerent-rent" /></label>
    `,
    calculate: () => {
      const price = Number(document.getElementById('pricerent-price').value);
      const rent = Number(document.getElementById('pricerent-rent').value);
      const ratio = price / rent;
      document.getElementById('calculator-results').innerHTML = `Price-to-Rent Ratio: ${ratio.toFixed(2)}`;
    }
  },

  // 11️⃣ Vacancy Rate Calculator
  vacancy: {
    title: "Vacancy Rate Calculator",
    description: "<p>Estimate rent loss due to vacancies.</p>",
    fields: `
      <label>Potential Rent: <input type="number" id="vac-rent" /></label><br/>
      <label>Vacancy %: <input type="number" id="vac-percent" /></label>
    `,
    calculate: () => {
      const rent = Number(document.getElementById('vac-rent').value);
      const percent = Number(document.getElementById('vac-percent').value);
      const loss = rent * (percent / 100);
      document.getElementById('calculator-results').innerHTML = `Vacancy Loss: $${loss.toFixed(2)}`;
    }
  },

  // 12️⃣ Operating Expense Ratio
  expenseRatio: {
    title: "Operating Expense Ratio",
    description: "<p>Proportion of income spent on operating expenses.</p>",
    fields: `
      <label>Operating Expenses: <input type="number" id="exp-expenses" /></label><br/>
      <label>Gross Income: <input type="number" id="exp-income" /></label>
    `,
    calculate: () => {
      const expenses = Number(document.getElementById('exp-expenses').value);
      const income = Number(document.getElementById('exp-income').value);
      const ratio = (expenses / income) * 100;
      document.getElementById('calculator-results').innerHTML = `Operating Expense Ratio: ${ratio.toFixed(2)}%`;
    }
  },

  // 13️⃣ Long-Term ROI (Appreciation + Rent)
  longTermROI: {
    title: "Long-Term ROI",
    description: "<p>Estimate total return including rent and property appreciation over time.</p>",
    fields: `
      <label>Purchase Price: <input type="number" id="lroi-price" /></label><br/>
      <label>Future Sale Price: <input type="number" id="lroi-future" /></label><br/>
      <label>Total Rent Earned: <input type="number" id="lroi-rent" /></label>
    `,
    calculate: () => {
      const price = Number(document.getElementById('lroi-price').value);
      const future = Number(document.getElementById('lroi-future').value);
      const rent = Number(document.getElementById('lroi-rent').value);
      const roi = ((future - price + rent) / price) * 100;
      document.getElementById('calculator-results').innerHTML = `Long-Term ROI: ${roi.toFixed(2)}%`;
    }
  },

  // 14️⃣ Fix & Flip Profit Calculator
  flip: {
    title: "Fix & Flip Calculator",
    description: "<p>Estimate profit from renovating and selling a property.</p>",
    fields: `
      <label>Purchase Price: <input type="number" id="flip-price" /></label><br/>
      <label>Renovation Cost: <input type="number" id="flip-renovation" /></label><br/>
      <label>Expected Sale Price: <input type="number" id="flip-sale" /></label>
    `,
    calculate: () => {
      const price = Number(document.getElementById('flip-price').value);
      const reno = Number(document.getElementById('flip-renovation').value);
      const sale = Number(document.getElementById('flip-sale').value);
      const profit = sale - (price + reno);
      document.getElementById('calculator-results').innerHTML = `Expected Profit: $${profit.toFixed(2)}`;
    }
  },

  // 15️⃣ Renovation ROI
  renovationROI: {
    title: "Renovation ROI",
    description: "<p>Estimate return on renovation investment.</p>",
    fields: `
      <label>Renovation Cost: <input type="number" id="reno-cost" /></label><br/>
      <label>Increase in Property Value: <input type="number" id="reno-increase" /></label>
    `,
    calculate: () => {
      const cost = Number(document.getElementById('reno-cost').value);
      const increase = Number(document.getElementById('reno-increase').value);
      const roi = (increase / cost) * 100;
      document.getElementById('calculator-results').innerHTML = `Renovation ROI: ${roi.toFixed(2)}%`;
    }
  },

  // 16️⃣ Tax Impact / Depreciation Calculator
  taxDepreciation: {
    title: "Tax & Depreciation Calculator",
    description: "<p>Estimate tax savings from depreciation and property deductions.</p>",
    fields: `
      <label>Annual Depreciation: <input type="number" id="tax-dep" /></label><br/>
      <label>Annual Profit Before Tax: <input type="number" id="tax-profit" /></label>
    `,
    calculate: () => {
      const dep = Number(document.getElementById('tax-dep').value);
      const profit = Number(document.getElementById('tax-profit').value);
      const taxable = profit - dep;
      document.getElementById('calculator-results').innerHTML = `Taxable Income After Depreciation: $${taxable.toFixed(2)}`;
    }
  },

  // 17️⃣ Price-to-Value / Comparative Market Analysis (CMA)
  cma: {
    title: "Price-to-Value / CMA",
    description: "<p>Estimate fair property value compared to similar properties.</p>",
    fields: `
      <label>Comparable Sale Prices Average: <input type="number" id="cma-average" /></label><br/>
      <label>Your Property Asking Price: <input type="number" id="cma-ask" /></label>
    `,
    calculate: () => {
      const avg = Number(document.getElementById('cma-average').value);
      const ask = Number(document.getElementById('cma-ask').value);
      const diff = ask - avg;
      document.getElementById('calculator-results').innerHTML = `Difference vs Market Average: $${diff.toFixed(2)}`;
    }
  },

  // 18️⃣ ROI with Leverage
  leveragedROI: {
    title: "ROI with Leverage",
    description: "<p>Estimate return including financing leverage.</p>",
    fields: `
      <label>Cash Invested: <input type="number" id="lev-cash" /></label><br/>
      <label>Total Property Value: <input type="number" id="lev-value" /></label><br/>
      <label>Profit at Sale: <input type="number" id="lev-profit" /></label>
    `,
    calculate: () => {
      const cash = Number(document.getElementById('lev-cash').value);
      const profit = Number(document.getElementById('lev-profit').value);
      const roi = (profit / cash) * 100;
      document.getElementById('calculator-results').innerHTML = `Leveraged ROI: ${roi.toFixed(2)}%`;
    }
  }

};
