// =========================================
// LOAD PROFORMA WIDGET
// =========================================

fetch("../proforma.html")
.then(response => response.text())
.then(html => {

    const container =
        document.getElementById("proforma-container");


    container.innerHTML = html;



    // Load property assumptions
    loadPropertyData();



    // Enable tabs
    setupTabs();



    // Run button
    const runButton =
        document.getElementById("runProforma");


    if (runButton) {

        runButton.addEventListener(
            "click",
            runModel
        );

    }



    // Live calculation when inputs change
    document
    .querySelectorAll(".proforma-field input")
    .forEach(input => {

        input.addEventListener(
            "input",
            runModel
        );

    });



    // Show default results immediately
    runModel();


})
.catch(error => {

    console.error(
        "Proforma loading error:",
        error
    );

});
