fetch("components/proforma.html")
.then(response => response.text())
.then(data => {

document.getElementById(
"proforma-container"
).innerHTML = data;


loadProforma();

});
