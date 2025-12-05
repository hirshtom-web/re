function loadCalculator(calculatorType) {
  const tabContainer = document.querySelector(".tab-container");
  const mainContent = document.querySelector(".inputs-container");

  // Clear existing tabs & contents
  tabContainer.innerHTML = "";
  mainContent.querySelectorAll(".tab-content").forEach(tc => tc.remove());

  const calc = calculators[calculatorType]; // your config object
  if (!calc) return;

  let first = true;

  Object.keys(calc.tabs).forEach(tabName => {
    // Create tab button
    const tab = document.createElement("div");
    tab.className = "tab";
    if (first) tab.classList.add("active");
    tab.dataset.tab = tabName;

    // Optional: add icon
    const icon = document.createElement("img");
    icon.src = calc.tabs[tabName].icon || "";
    icon.className = "tab-icon";
    tab.appendChild(icon);

    const label = document.createElement("span");
    label.textContent = tabName;
    tab.appendChild(label);

    tabContainer.appendChild(tab);

    // Create tab content
    const tabContent = document.createElement("div");
    tabContent.className = "tab-content";
    if (first) tabContent.classList.add("active");
    tabContent.id = `tab-${tabName}`;
    mainContent.appendChild(tabContent);

    // Add inputs dynamically
    calc.tabs[tabName].inputs.forEach(inputId => {
      const inputEl = document.getElementById(inputId);
      if (inputEl) {
        tabContent.appendChild(inputEl.parentElement.cloneNode(true));
      }
    });

    first = false;
  });

  // Add tab click behavior
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
