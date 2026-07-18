let savedScrollPosition = 0;


function openModal(page, id){

    let modal = document.getElementById("dealModal");
    let frame = document.getElementById("dealFrame");

    savedScrollPosition = window.scrollY;


    const url =
        page + "#" + id;


    console.log("IFRAME LOADING:", url);


    frame.src = url;


    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    modal.classList.add("active");

}



function closeDeal(){

    let modal = document.getElementById("dealModal");
    let frame = document.getElementById("dealFrame");

    modal.classList.remove("active");

    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");

    frame.src = "";

    history.pushState(null, "", window.location.pathname);

    setTimeout(function(){

        window.scrollTo(0, savedScrollPosition);

    }, 50);

}



window.addEventListener("load", function(){

    let id = window.location.hash.substring(1);

    console.log("PROPERTY ID:", id);

    if(!id){
        return;
    }

    let property = window.properties[id];

    console.log("PROPERTY DATA:", property);

    if(!property){

        console.log("Property not found:", id);
        return;

    }

    let frame = document.getElementById("dealFrame");

    if(!property.page){

        console.log("Missing property.page for:", id);
        return;

    }

    console.log("LOADING PAGE:", property.page);

    savedScrollPosition = window.scrollY;

    // Also preserve the hash when opening directly from a URL
    frame.src = property.page + "#" + id;

    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    document.getElementById("dealModal")
        .classList.add("active");

});
