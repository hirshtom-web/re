fetch("proforma.html")
.then(response => response.text())
.then(html => {

    document
        .getElementById("proforma-container")
        .innerHTML = html;

    // Initialize AFTER the HTML exists
    loadPropertyData();
    setupTabs();

    const runButton = document.getElementById("runProforma");

    if (runButton) {
        runButton.addEventListener("click", runModel);
    }

});
