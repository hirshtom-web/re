fetch("proforma.html")
.then(response => response.text())
.then(html => {

    document
        .getElementById("proforma-container")
        .innerHTML = html;

    loadPropertyData();
    setupTabs();

    const runButton = document.getElementById("runProforma");

    if (runButton) {
        runButton.addEventListener("click", runModel);
    }

    // Populate results immediately using the default assumptions
    runModel();

});
