// =========================================
// LOAD PROFORMA WIDGET
// =========================================


function initProforma(){

    fetch("../tools/proforma.html")

    .then(response => response.text())

    .then(html => {


        const container =
            document.getElementById("proforma-container");


        container.innerHTML = html;


        loadPropertyData();


        setupTabs();


        const runButton =
            document.getElementById("runProforma");


        if(runButton){

            runButton.addEventListener(
                "click",
                runModel
            );

        }


        document
        .querySelectorAll(".proforma-field input")
        .forEach(input=>{


            input.addEventListener(
                "input",
                runModel
            );


        });


        runModel();


    })

    .catch(error=>{

        console.error(
            "Proforma loading error:",
            error
        );

    });

}



window.addEventListener(
"DOMContentLoaded",
()=>{


    setTimeout(()=>{

        initProforma();

    },300);


});
