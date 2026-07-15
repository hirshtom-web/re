function openDeal(page){

    let modal = document.getElementById("dealModal");
    let frame = document.getElementById("dealFrame");

    frame.src = page;

    modal.classList.add("active");
    document.body.classList.add("modal-open"); // Freeze background

    // update browser URL
    let dealName = page.replace(".html","");

    history.pushState(null, "", "?deal=" + dealName);

}



function closeDeal(){

    let modal = document.getElementById("dealModal");
    let frame = document.getElementById("dealFrame");

    modal.classList.remove("active");
    document.body.classList.remove("modal-open"); // Unfreeze background

    frame.src = "";

    // remove deal from URL
    history.pushState(null, "", window.location.pathname);

}



// Automatically open deal if URL contains ?deal=
window.addEventListener("load", function(){

    let params = new URLSearchParams(window.location.search);

    let deal = params.get("deal");


    if(deal){

        openDeal(deal + ".html");

    }

});
