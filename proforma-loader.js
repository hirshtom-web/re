fetch("components/proforma.html")

.then(response => {

    if(!response.ok){

        throw new Error("Proforma file not found");

    }

    return response.text();

})


.then(data => {


    document
    .getElementById("proforma-container")
    .innerHTML = data;


    loadPropertyData();

    setupTabs();


})


.catch(error => {

    console.error(error);

});
