function loadCalculator(calculatorType) {
    const tabContainer = document.querySelector(".tab-container");
    const tabContentsContainer = document.querySelector(".main-content");

    tabContainer.innerHTML = ""; // Clear existing tabs
    // Hide all existing tab contents
    document.querySelectorAll(".tab-content").forEach(tc => tc.remove());

    const calc = calculators[calculatorType];

    calc.tabs.forEach((tab, index) => {
        // Create tab
        const tabEl = document.createElement("div");
        tabEl.className = "tab";
        if(index === 0) tabEl.classList.add("active"); // make first tab active
        tabEl.dataset.tab = tab.id;
        tabEl.innerHTML = `<img src="${tab.icon}" class="tab-icon">${tab.label}`;
        tabContainer.appendChild(tabEl);

        // Create tab content container
        const tabContentEl = document.createElement("div");
        tabContentEl.id = `tab-${tab.id}`;
        tabContentEl.className = "tab-content";
        if(index === 0) tabContentEl.classList.add("active"); // first tab active
        tabContentsContainer.appendChild(tabContentEl);

        // You can then dynamically append the input fields for each tab
        calc.inputs[tab.id].forEach(inputId => {
            const inputGroup = document.getElementById(inputId);
            if(inputGroup) {
                tabContentEl.appendChild(inputGroup.parentElement.cloneNode(true));
            }
        });
    });

    // Add the tab click behavior
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(tc => tc.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(`tab-${target}`).classList.add("active");
        });
    });
}
