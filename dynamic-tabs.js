function loadCalculator(calculatorType) {
  const tabContainer = document.querySelector(".tab-container");
  const mainContent = document.querySelector(".inputs-container");

  // Clear existing tabs & tab contents
  tabContainer.innerHTML = "";
  mainContent.querySelectorAll(".tab-content").forEach(tc => tc.remove());

  const calc = calculators[calculatorType];
  if (!calc) return;

  let first = true;

  Object.keys(calc.tabs).forEach(tabName => {
    // Create tab button
    const tab = document.createElement("div");
    tab.className = "tab";
    if (first) tab.classList.add("active");
    tab.dataset.tab = tabName;
    tab.textContent = tabName; // Replace with icon+label if needed
    tabContainer.appendChild(tab);

    // Create tab content container
    const tabContent = document.createElement("div");
    tabContent.className = "tab-content";
    if (first) tabContent.classList.add("active");
    tabContent.id = `tab-${tabName}`;
    mainContent.appendChild(tabContent);

    // Add inputs dynamically
    calc.tabs[tabName].forEach(inputId => {
      const inputEl = document.getElementById(inputId);
      if (inputEl) {
        tabContent.appendChild(inputEl.parentElement.cloneNode(true));
      }
    });

    first = false;
  });

  // Add tab switching behavior
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(tc => tc.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`tab-${target}`).classList.add("active");
    });
  });
}
