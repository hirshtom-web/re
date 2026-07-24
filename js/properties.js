fetch("properties-grid.html")
.then(response => response.text())
.then(html => {

    document.getElementById("properties-grid-container").innerHTML = html;

    renderProperties();

});
