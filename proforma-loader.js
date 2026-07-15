fetch("./components/proforma.html")
.then(response => response.text())
.then(html => {

    document
    .getElementById("proforma-container")
    .innerHTML = html;


});
